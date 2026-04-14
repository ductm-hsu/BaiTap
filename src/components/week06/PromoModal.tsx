import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PromoModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút ngoài màn hình chính để gọi Modal */}
      <TouchableOpacity style={styles.triggerButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.triggerText}>Mở Modal Quảng Cáo (Bài 2)</Text>
      </TouchableOpacity>

      {/* --- MODAL QUẢNG CÁO --- */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Nút tắt X ở góc phải */}
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <AntDesign name="close-circle" size={24} color="#999" />
            </TouchableOpacity>

            <Text style={styles.brandTitle}>📚 HarperCollins Publishers</Text>
            
            {/* Vùng chứa ảnh giả lập */}
            <View style={styles.imagePlaceholder}>
                <Image source={require('../../../assets/images/week06_promo.jpg')} style={{width: '100%', height: 120, borderRadius: 10}} />
            </View>

            <Text style={styles.mainTitle}>English Exam{'\n'}Preparation Series</Text>
            <Text style={styles.description}>
              A comprehensive AI-powered series designed to help prepare for English proficiency exams
            </Text>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.checkoutText}>Check it out</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e2e2e2' },
  triggerButton: { backgroundColor: '#0984e3', padding: 15, borderRadius: 8 },
  triggerText: { color: 'white', fontWeight: 'bold' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center' },
  closeIcon: { position: 'absolute', top: 15, right: 15, zIndex: 1 },
  brandTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
  imagePlaceholder: { width: '100%', height: 120, backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#2b6cb0', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 25, paddingHorizontal: 10 },
  checkoutButton: { backgroundColor: '#2b6cb0', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, width: '80%', alignItems: 'center' },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});