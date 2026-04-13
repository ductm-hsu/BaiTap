import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './welcome';

export default function LastScreen() {
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: '#eb4d4b' }]}>
      <Image source={require('../../../assets/images/week03_img03.jpg')} style={styles.image} />
      <Text style={styles.text}>Hello, every body!</Text>
      
      {/* Nút bấm quay lại (Back) */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}