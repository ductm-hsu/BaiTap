import { Stack } from 'expo-router';
// 1. Import Provider và store vào
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';

export default function Week10Layout() {
  return (
    // 2. Bọc toàn bộ Stack bên trong Provider
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}