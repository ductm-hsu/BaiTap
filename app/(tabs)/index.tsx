import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Danh sách Bài tập</Text>

      {/* Điều hướng Tuần 1 */}
      <Link href={"/week01" as any} style={styles.linkButton}>
        Tuần 1: Intro (Trang giới thiệu)
      </Link>

      {/* Điều hướng Tuần 2 */}
      <Link href={"week02/week02_s1" as any} style={[styles.linkButton, { backgroundColor: '#e67e22' }]}>
        Tuần 2 - Bài 1: Logo VUS
      </Link>
      
      <Link href={"week02/week02_s2" as any} style={[styles.linkButton, { backgroundColor: '#2ecc71' }]}>
        Tuần 2 - Bài 2: PetStore (FlatList)
      </Link>

      {/* Điều hướng Tuần 3 */}
      <Link href={"/week03" as any} style={[styles.linkButton, { backgroundColor: '#9b59b6' }]}>
        Tuần 3: Navigation (Stack & Tab)
      </Link>

      {/* Điều hướng Tuần 4 */}
      <Link href={"/week04/week04" as any} style={[styles.linkButton, { backgroundColor: '#e84393' }]}>
        Tuần 4: Giao diện VssID (Icons & Buttons)
      </Link>  

      {/* Điều hướng Tuần 5 */}
      <Link href={"/week05" as any} style={[styles.linkButton, { backgroundColor: '#e74c3c' }]}>
        Tuần 5: Redux & Quản lý trạng thái
      </Link>      

      {/* Điều hướng Tuần 6 */}
      <Link href={"/week06" as any} style={[styles.linkButton, { backgroundColor: '#d81b60' }]}>
        Tuần 6 - Bài 1: Đăng nhập & Modal Vân tay
      </Link>
      <Link href={"/week06/promo" as any} style={[styles.linkButton, { backgroundColor: '#2b6cb0' }]}>
        Tuần 6 - Bài 2: Modal Quảng cáo
      </Link>      

      {/* Điều hướng Tuần 7 */}
      <Link href={"/week07" as any} style={[styles.linkButton, { backgroundColor: '#f39c12' }]}>
        Tuần 7: Validation & Alert Thông Báo
      </Link>          
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    paddingVertical: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2f3640'
  },
  linkButton: { 
    width: '85%',
    paddingVertical: 18, 
    backgroundColor: '#3498db', 
    color: '#fff', 
    borderRadius: 12, 
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  }
});