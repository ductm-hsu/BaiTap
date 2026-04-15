import { FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthSecureStore() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Trạng thái để kiểm tra xem đã đăng nhập thành công chưa
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>('');

  // 1. Hàm Đăng Ký (Lưu thông tin vào Secure Store)
  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ Email và Mật khẩu!");
      return;
    }
    try {
      // Mã hóa và lưu trữ cặp (Key, Value)
      await SecureStore.setItemAsync('secure_email', email);
      await SecureStore.setItemAsync('secure_password', password);
      
      Alert.alert("Thành công", "Đăng ký thành công! Dữ liệu đã được lưu bảo mật.");
      // Xóa form sau khi đăng ký
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu trữ dữ liệu!");
    }
  };

  // 2. Hàm Đăng Nhập (Đọc và đối chiếu từ Secure Store)
  const handleLogin = async () => {
    try {
      // Lấy dữ liệu ra bằng Key tương ứng
      const storedEmail = await SecureStore.getItemAsync('secure_email');
      const storedPassword = await SecureStore.getItemAsync('secure_password');

      if (storedEmail === email && storedPassword === password) {
        setIsLoggedIn(true);
        setCurrentUser(storedEmail);
        Alert.alert("Thành công", "Đăng nhập chính xác!");
      } else {
        Alert.alert("Thất bại", "Sai email, mật khẩu hoặc tài khoản chưa được đăng ký!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đọc dữ liệu từ hệ thống!");
    }
  };

  // 3. Hàm Đăng Xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* NẾU ĐÃ ĐĂNG NHẬP: Hiển thị màn hình chào mừng */}
        {isLoggedIn ? (
          <View style={styles.loggedInBox}>
            <FontAwesome name="check-circle" size={80} color="#27ae60" style={{ marginBottom: 20 }} />
            <Text style={styles.title}>Xin chào!</Text>
            <Text style={styles.userText}>{currentUser}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={handleLogout}>
              <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        ) : (
          
          /* NẾU CHƯA ĐĂNG NHẬP: Hiển thị Form Đăng nhập / Đăng ký */
          <View style={styles.formBox}>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <View style={styles.iconCircle}>
                <FontAwesome name="lock" size={40} color="white" />
              </View>
              <Text style={styles.title}>Bảo Mật Secure Store</Text>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              value={email} 
              onChangeText={setEmail} 
              placeholder="Nhập email..."
              autoCapitalize="none" 
            />
            
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry={true} 
              value={password}
              onChangeText={setPassword}
              placeholder="Nhập mật khẩu..."
            />

            <View style={styles.rowButtons}>
              <TouchableOpacity style={[styles.button, styles.btnRegister]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.btnLogin]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  formBox: { backgroundColor: 'white', padding: 25, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  loggedInBox: { backgroundColor: 'white', padding: 40, borderRadius: 15, alignItems: 'center', elevation: 5 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#34495e', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, color: '#2c3e50', fontWeight: 'bold' },
  userText: { fontSize: 18, color: '#7f8c8d', marginBottom: 30, marginTop: 10 },
  label: { fontSize: 16, color: '#333', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, fontSize: 16, marginBottom: 20, paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#fafafa' },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { paddingVertical: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', width: '48%' },
  btnRegister: { backgroundColor: '#95a5a6' },
  btnLogin: { backgroundColor: '#3498db' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});