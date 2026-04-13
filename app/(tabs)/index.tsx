import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Import các bài tập từ các tuần khác nhau
// import Intro from '../../src/components/week01/intro';
// import Screen01 from '../../src/components/week02/screen01';
// import Screen02 from '../../src/components/week02/screen02';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Intro /> */}
      {/* <Screen01 /> */}
      {/* <Screen02 /> */}

      {/* --- MENU ĐIỀU HƯỚNG --- */}
      <Text style={styles.title}>Danh sách Bài tập</Text>

      {/* Nút bấm chuyển sang Bài tập Tuần 3 */}
      <Link href={"/week03" as any} style={styles.linkButton}>
        Mở Bài Tập Tuần 3 (Stack Navigation)
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f6fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2f3640'
  },
  linkButton: { 
    paddingHorizontal: 20,
    paddingVertical: 15, 
    backgroundColor: '#00a8ff',
    color: '#fff', 
    borderRadius: 8, 
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
    textAlign: 'center'
  }
});