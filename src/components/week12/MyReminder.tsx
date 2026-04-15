import { MaterialIcons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// BƯỚC QUAN TRỌNG: Cấu hình để thông báo vẫn hiện ra MẶC DÙ bạn đang mở app
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function MyReminder() {
  const [text, setText] = useState('');
  const [reminders, setReminders] = useState<any[]>([]);

  // Xin quyền gửi thông báo từ người dùng ngay khi mở màn hình
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    // Cấu hình kênh thông báo cho Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    // Kiểm tra thiết bị thật/ảo và xin quyền
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Lưu ý', 'Bạn cần cấp quyền để nhận thông báo!');
        return;
      }
    }
  }

  // Hàm tạo nhắc nhở và lên lịch Notification
  const addReminder = async (seconds: number) => {
    if (text.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung ghi nhớ!');
      return;
    }

    // 1. Lệnh gọi Notification của hệ thống
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Nhắc nhở của bạn!",
        body: text,
        sound: true,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: seconds }, // Gửi thông báo sau X giây
    });

    // 2. Thêm vào danh sách hiển thị trên màn hình
    const newReminder = {
      id: identifier,
      text: text,
      time: new Date(Date.now() + seconds * 1000).toLocaleTimeString(),
    };
    
    setReminders((prev) => [...prev, newReminder]);
    setText('');
    Alert.alert("Thành công", `Đã hẹn nhắc nhở sau ${seconds} giây!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="notifications-active" size={30} color="white" />
        <Text style={styles.headerTitle}>My Reminder</Text>
      </View>

      <View style={styles.content}>
        {/* Khu vực tạo nhắc nhở */}
        <Text style={styles.label}>Nội dung nhắc nhở:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ví dụ: Uống nước, Làm bài tập..."
          value={text}
          onChangeText={setText}
        />

        <Text style={styles.label}>Nhắc tôi sau:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.timeButton} onPress={() => addReminder(5)}>
            <Text style={styles.timeText}>5 giây</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeButton} onPress={() => addReminder(10)}>
            <Text style={styles.timeText}>10 giây</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeButton} onPress={() => addReminder(60)}>
            <Text style={styles.timeText}>1 Phút</Text>
          </TouchableOpacity>
        </View>

        {/* Khu vực danh sách nhắc nhở */}
        <View style={styles.divider} />
        <Text style={styles.listTitle}>Danh sách chờ nhắc nhở:</Text>
        
        {reminders.length === 0 ? (
          <Text style={styles.emptyText}>Chưa có nhắc nhở nào.</Text>
        ) : (
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <View>
                  <Text style={styles.reminderText}>{item.text}</Text>
                  <Text style={styles.reminderTime}>Sẽ báo lúc: {item.time}</Text>
                </View>
                <MaterialIcons name="timer" size={24} color="#e67e22" />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: { backgroundColor: '#e67e22', padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  content: { padding: 20, flex: 1 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  timeButton: { backgroundColor: '#3498db', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, width: '30%', alignItems: 'center' },
  timeText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#ccc', marginBottom: 20 },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  emptyText: { textAlign: 'center', color: '#7f8c8d', fontStyle: 'italic', marginTop: 20 },
  reminderItem: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 5, borderLeftColor: '#e67e22', elevation: 2 },
  reminderText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  reminderTime: { fontSize: 13, color: '#7f8c8d' },
});