import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { AppDispatch, RootState } from '../../store/store';

// Bộ ánh xạ tên thư viện Icon thành Component thật
const IconFamilies: any = {
  MaterialCommunityIcons,
  FontAwesome5,
};

// Component Nút bấm (Giữ nguyên Animation từ Tuần 9)
const AnimatedMenuItem = ({ item }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const IconComponent = IconFamilies[item.iconFamily] || FontAwesome5;

  const handlePressIn = () => Animated.spring(scaleValue, { toValue: 0.9, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleValue, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }).start();

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.menuItem, { transform: [{ scale: scaleValue }] }]}>
        <IconComponent name={item.iconName} size={40} color={item.iconColor} style={styles.icon} />
        <Text style={styles.menuText}>{item.title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default function TraCuuAPI() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.categories as any);

  // Gọi API ngay khi màn hình vừa bật lên
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tra Cứu (API & Redux)</Text>
      </View>

      {/* Hiển thị vòng xoay nếu đang tải dữ liệu */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8e44ad" />
          <Text style={{ marginTop: 10 }}>Đang tải danh mục từ API...</Text>
        </View>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Lỗi: {error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {/* Lặp qua mảng dữ liệu lấy từ API để in ra giao diện */}
            {list.map((category: any) => (
              <AnimatedMenuItem key={category.id} item={category} />
            ))}
          </View>

          <View style={styles.bannerContainer}>
            <Text style={styles.bannerTitle}>Tổng Quan Tài Chính</Text>
            <Text style={styles.bannerDesc}>Theo dõi tài chính cá nhân của Bạn thường xuyên để kiểm soát chi tiêu hợp lý nhất!</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Trải Nghiệm Ngay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// CSS tái sử dụng từ tuần 9
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: { backgroundColor: '#8e44ad', paddingVertical: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menuItem: { width: '48%', backgroundColor: 'white', paddingVertical: 25, paddingHorizontal: 10, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 3 },
  icon: { marginBottom: 15 },
  menuText: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
  bannerContainer: { backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center', marginTop: 10, elevation: 3 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  bannerDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  bannerButton: { backgroundColor: '#8e44ad', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  bannerButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});