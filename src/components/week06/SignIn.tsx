import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
  const router = useRouter();
  // State để điều khiển việc đóng/mở Modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon và Tiêu đề */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome name="user" size={40} color="white" />
          </View>
          <Text style={styles.title}>Sign in</Text>
        </View>

        {/* Form nhập liệu */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
          
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('../week06/signup')}>
            <Text style={styles.linkText}>Need an account? <Text style={styles.linkTextBold}>Sign up</Text></Text>
          </TouchableOpacity>
        </View>

        {/* Nút bấm mở Modal Vân tay */}
        <TouchableOpacity style={styles.fingerprintBtn} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="fingerprint" size={50} color="#d81b60" />
        </TouchableOpacity>
      </View>

      {/* --- PHẦN MODAL VÂN TAY --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <MaterialCommunityIcons name="fingerprint" size={50} color="#d81b60" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Touch ID for login "Your App"</Text>
            <Text style={styles.modalSubtitle}>Sign in application</Text>
            
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// CSS dùng chung cho cả SignIn và SignUp
export const styles = StyleSheet.create({
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
  fingerprintBtn: { alignItems: 'center', marginTop: 20 },
  
  // Styles cho Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  cancelButton: { borderTopWidth: 1, borderTopColor: '#eee', width: '100%', alignItems: 'center', paddingTop: 15 },
  cancelText: { color: '#0056b3', fontSize: 16 }
});