import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Lấy các Icon từ bộ thư viện có sẵn của Expo
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginVssID() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <View style={styles.headerBackground}>
          <View style={styles.topBar}>
            <Ionicons name="notifications-outline" size={28} color="white" />
            <Image 
              source={require('../../../assets/images/vietnam_flag.png')}
              style={styles.flagIcon} 
            />
          </View>
          
          <Image 
            source={require('../../../assets/images/vssid_logo.png')}
            style={styles.logo} 
            resizeMode="contain" 
          />
        </View>

        {/* Phần Form Đăng nhập */}
        <View style={styles.formContainer}>
          
          {/* Input 1: Mã số BHXH */}
          <View style={styles.inputRow}>
            <View style={styles.iconWrapper}>
              <FontAwesome name="user" size={24} color="white" />
            </View>
            <TextInput 
              style={styles.input} 
              placeholder="Mã số BHXH" 
              placeholderTextColor="#999" 
            />
          </View>

          {/* Input 2: Mật khẩu */}
          <View style={styles.inputRow}>
            <View style={styles.iconWrapper}>
              <FontAwesome name="lock" size={24} color="white" />
            </View>
            <TextInput 
              style={styles.input} 
              placeholder="Mật khẩu" 
              placeholderTextColor="#999" 
              secureTextEntry={true} 
            />
          </View>

          {/* Chữ Quên mật khẩu & Đăng ký */}
          <View style={styles.linksRow}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
          </View>

          {/* Nút Đăng nhập */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          {/* Icon Vân tay ở giữa */}
          <View style={styles.fingerprintWrapper}>
            <MaterialCommunityIcons name="fingerprint" size={70} color="#005a9e" />
          </View>

        </View>

        {/* Footer dưới cùng */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Mới cài đặt VssID</Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    backgroundColor: '#3498db',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 40,
  },
  flagIcon: { width: 35, height: 25, borderRadius: 3 },
  logo: { width: 140, height: 140, marginTop: 10 },
  formContainer: { paddingHorizontal: 30, marginTop: 30 },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#005a9e',
    paddingVertical: 12,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: { flex: 1, paddingHorizontal: 15, fontSize: 16 },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  linkText: { color: '#666', fontSize: 14 },
  loginButton: {
    borderWidth: 2,
    borderColor: '#005a9e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButtonText: { color: '#005a9e', fontSize: 18, fontWeight: 'bold' },
  fingerprintWrapper: { alignItems: 'center', marginBottom: 20 },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
  footerText: { color: '#555', fontSize: 15 },
});