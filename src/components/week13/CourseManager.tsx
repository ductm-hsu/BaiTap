import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabaseConfig'; // Import cấu hình Supabase

type Course = { id: string; title: string; imageUrl: string };

export default function CourseManagerSupabase() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Lấy danh sách khóa học từ Supabase Database (READ)
  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*').order('id', { ascending: false });
    if (error) {
      console.log('Lỗi lấy dữ liệu:', error);
    } else {
      setCourses(data as Course[]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Hàm chọn ảnh từ thiết bị
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Hàm upload ảnh lên Supabase Storage
  const uploadImageAsync = async (uri: string) => {
    try {
      // 1. Chuyển đổi ảnh thành dạng ArrayBuffer để upload
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      
      // 2. Tạo tên file ngẫu nhiên để không bị trùng
      const fileExt = uri.split('.').pop() || 'jpeg';
      const fileName = `${Date.now()}.${fileExt}`;

      // 3. Upload lên bucket 'course_images'
      const { error } = await supabase.storage
        .from('course_images')
        .upload(fileName, arrayBuffer, {
          contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`
        });

      if (error) throw error;

      // 4. Lấy link URL công khai của bức ảnh
      const { data: { publicUrl } } = supabase.storage
        .from('course_images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Lỗi upload ảnh:', error);
      return null;
    }
  };

  // Hàm Lưu (CREATE / UPDATE)
  const handleSave = async () => {
    if (!title) {
      Alert.alert("Lỗi", "Vui lòng nhập tên khóa học!");
      return;
    }
    setUploading(true);
    
    try {
      let finalImageUrl = imageUri;

      // Nếu đang có ảnh local (chưa phải link web) thì tiến hành upload
      if (imageUri && !imageUri.startsWith('http')) {
        const uploadedUrl = await uploadImageAsync(imageUri);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const courseData = { 
        title: title, 
        imageUrl: finalImageUrl || "https://via.placeholder.com/150" 
      };

      if (editingId) {
        // Cập nhật (UPDATE)
        await supabase.from('courses').update(courseData).eq('id', editingId);
        Alert.alert("Thành công", "Đã cập nhật khóa học!");
      } else {
        // Thêm mới (CREATE)
        await supabase.from('courses').insert([courseData]);
        Alert.alert("Thành công", "Đã thêm khóa học mới!");
      }

      setTitle('');
      setImageUri(null);
      setEditingId(null);
      fetchCourses(); // Cập nhật danh sách trên màn hình
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu trữ!");
    } finally {
      setUploading(false);
    }
  };

  // Hàm Xóa (DELETE)
  const handleDelete = async (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa khóa học này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: async () => {
          await supabase.from('courses').delete().eq('id', id);
          fetchCourses();
        }
      }
    ]);
  };

  const handleEdit = (course: Course) => {
    setTitle(course.title);
    setImageUri(course.imageUrl);
    setEditingId(course.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Quản lý Khóa Học (Supabase)</Text>
      
      {/* Form Nhập Liệu */}
      <View style={styles.formCard}>
        <TextInput style={styles.input} placeholder="Nhập tên khóa học..." value={title} onChangeText={setTitle} />
        
        <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
          <FontAwesome name="image" size={24} color="#3498db" />
          <Text style={styles.imagePickerText}>{imageUri ? "Đổi ảnh khác" : "Chọn ảnh khóa học"}</Text>
        </TouchableOpacity>
        
        {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={uploading}>
          {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>{editingId ? "Cập Nhật" : "Thêm Khóa Học"}</Text>}
        </TouchableOpacity>
        
        {editingId && (
          <TouchableOpacity style={styles.cancelBtn} onPress={() => { setEditingId(null); setTitle(''); setImageUri(null); }}>
            <Text style={styles.cancelBtnText}>Hủy Chỉnh Sửa</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Danh sách Khóa Học */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.courseImage} />
            <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={{ marginRight: 15 }}>
                <MaterialIcons name="edit" size={24} color="#f39c12" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// CSS giữ nguyên hoàn toàn so với bản Firebase
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20, textAlign: 'center' },
  formCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  imagePickerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderWidth: 1, borderColor: '#3498db', borderStyle: 'dashed', borderRadius: 8, marginBottom: 15 },
  imagePickerText: { color: '#3498db', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  previewImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 15, resizeMode: 'cover' },
  saveBtn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#95a5a6', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  cancelBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  courseItem: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 2 },
  courseImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  courseTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#333' },
  actionButtons: { flexDirection: 'row' }
});