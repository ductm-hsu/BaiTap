import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const router = useRouter();
  
  // Tạo các state để lưu trữ giá trị người dùng gõ vào
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hàm xử lý kiểm tra dữ liệu khi bấm nút Submit
  const handleValidation = () => {
    // 1. Kiểm tra Email phải có chữ "@"
    if (!email.includes('@')) {
      Alert.alert('Lỗi nhập liệu', 'Email phải chứa ký tự "@"');
      return; // Dừng lại không chạy tiếp code bên dưới
    }

    // 2. Kiểm tra Password không được để trống
    if (password.trim() === '') {
      Alert.alert('Lỗi nhập liệu', 'Password không được để trống');
      return;
    }

    // 3. Kiểm tra Password >= 6 ký tự và có chứa số
    const hasNumber = /\d/; // Biểu thức chính quy (Regex) kiểm tra xem có số hay không
    if (password.length < 6 || !hasNumber.test(password)) {
      Alert.alert('Lỗi nhập liệu', 'Password phải có ít nhất 6 ký tự và chứa ít nhất 1 chữ số');
      return;
    }

    // Nếu vượt qua hết các bài kiểm tra trên thì báo thành công!
    Alert.alert('Thành công', 'Thông tin hợp lệ. Chào mừng bạn!', [
      { text: 'OK', onPress: () => router.back() } // Bấm OK thì quay lại màn hình trước
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome name="user" size={40} color="white" />
          </View>
          <Text style={styles.title}>Sign up</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} // Gắn state vào
            onChangeText={setEmail} // Cập nhật state khi gõ
            autoCapitalize="none" // Tắt tự động viết hoa chữ cái đầu cho email
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            value={password}
            onChangeText={setPassword}
          />

          {/* Gắn hàm kiểm tra vào sự kiện onPress của nút */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleValidation}>
            <Text style={styles.primaryButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Log in</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// CSS tái sử dụng từ tuần 6
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d81b60', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 28, color: '#d81b60', fontWeight: 'bold' },
  form: { marginBottom: 30 },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#d81b60', fontSize: 16, marginBottom: 20, paddingVertical: 5 },
  primaryButton: { backgroundColor: '#d81b60', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  primaryButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkText: { textAlign: 'center', color: '#666', fontSize: 14 },
  linkTextBold: { color: '#0056b3', fontWeight: 'bold' },
});