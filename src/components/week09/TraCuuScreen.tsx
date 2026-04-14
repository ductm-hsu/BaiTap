import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// Component con: Nút bấm có hiệu ứng Animation
const AnimatedMenuItem = ({ title, iconName, iconColor, IconFamily }: any) => {
  // Khởi tạo giá trị scale ban đầu là 1
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Hàm kích hoạt khi người dùng chạm ngón tay vào (Bóp nhỏ lại)
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9, // Thu nhỏ lại 90%
      useNativeDriver: true,
    }).start();
  };

  // Hàm kích hoạt khi người dùng nhấc ngón tay ra (Nảy trở lại)
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Trở về kích thước gốc
      friction: 4, // Độ ma sát (tạo độ nảy)
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.menuItem, { transform: [{ scale: scaleValue }] }]}>
        <IconFamily name={iconName} size={40} color={iconColor} style={styles.icon} />
        <Text style={styles.menuText}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default function TraCuuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header màu tím */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tra Cứu</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Lưới các chức năng */}
        <View style={styles.gridContainer}>
          <AnimatedMenuItem title="Tài Khoản" iconName="bank" iconColor="#2ecc71" IconFamily={MaterialCommunityIcons} />
          <AnimatedMenuItem title="Tiết Kiệm" iconName="piggy-bank" iconColor="#9b59b6" IconFamily={FontAwesome5} />
          <AnimatedMenuItem title="Khoản Vay" iconName="hand-holding-usd" iconColor="#f1c40f" IconFamily={FontAwesome5} />
          <AnimatedMenuItem title="Thẻ Tín Dụng" iconName="credit-card" iconColor="#3498db" IconFamily={FontAwesome5} />
          <AnimatedMenuItem title="Lệnh Chuyển Tiền" iconName="format-list-bulleted" iconColor="#e74c3c" IconFamily={MaterialCommunityIcons} />
          <AnimatedMenuItem title="Thông Tin Tổng Hợp" iconName="folder-open" iconColor="#1abc9c" IconFamily={FontAwesome5} />
        </View>

        {/* Banner Tổng Quan Tài Chính */}
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerTitle}>Tổng Quan Tài Chính</Text>
          <Text style={styles.bannerDesc}>
            Theo dõi tài chính cá nhân của Bạn thường xuyên để kiểm soát chi tiêu hợp lý nhất!
          </Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Trải Nghiệm Ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: { 
    backgroundColor: '#8e44ad', 
    paddingVertical: 20, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 15 },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: { marginBottom: 15 },
  menuText: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
  
  bannerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  bannerDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  bannerButton: { backgroundColor: '#8e44ad', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  bannerButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});