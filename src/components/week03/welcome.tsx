import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: '#6ab04c' }]}>
      <Image source={require('../../../assets/images/week03_img01.jpg')} style={styles.image} />
      <Text style={styles.text}>Hi, every body!</Text>
      
      {/* Nút bấm chuyển sang màn hình Next */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/week03/next')}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

// CSS chung cho cả 3 màn hình
export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 160, height: 160, borderRadius: 80, marginBottom: 20 },
  text: { fontSize: 24, color: 'white', marginBottom: 20 },
  button: { backgroundColor: '#0984e3', paddingHorizontal: 35, paddingVertical: 12, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});