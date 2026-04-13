import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './welcome'; // Tái sử dụng CSS từ file welcome

export default function NextScreen() {
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: '#f0932b' }]}>
      <Image source={require('../../../assets/images/week03_img02.jpg')} style={styles.image} />
      <Text style={styles.text}>Congratulation!</Text>
      
      {/* Nút bấm chuyển sang màn hình Last */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/week03/last')}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}