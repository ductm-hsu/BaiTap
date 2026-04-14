import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function ViewAll() {
  const router = useRouter();
  // Lấy danh sách skills từ Redux Store
  const skills = useSelector((state: RootState) => state.skills);

  return (
    <View style={styles.container}>
      {/* Hiển thị danh sách kỹ năng dạng lưới (flexWrap) */}
      <View style={styles.skillsWrapper}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill.name}</Text>
          </View>
        ))}
      </View>

      {/* Nút thêm mới */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('../week05/create')}
      >
        <Text style={styles.addButtonText}>Add New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40 },
  skillBadge: {
    borderWidth: 1,
    borderColor: '#e74c3c', // Viền đỏ
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: 'white'
  },
  skillText: { color: '#333', fontSize: 16 },
  addButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});