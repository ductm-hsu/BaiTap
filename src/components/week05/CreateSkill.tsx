import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addSkill } from '../../store/skillSlice';

export default function CreateSkill() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = () => {
    if (id && name) {
      // Gửi dữ liệu mới vào Redux Store
      dispatch(addSkill({ id, name }));
      // Quay lại màn hình trước
      router.back();
    } else {
      alert("Vui lòng nhập đủ ID và Tên kỹ năng!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID (Ví dụ: 8)"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên kỹ năng (Ví dụ: Bootstrap)"
        value={name}
        onChangeText={setName}
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#f5f5f5' },
  input: {
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000', // Gạch dưới màu đỏ
    marginBottom: 30,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});