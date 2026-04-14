import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';

export default function Week05Layout() {
  return (
    // Bọc toàn bộ Stack trong Provider của Redux
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'ViewAll' }} />
        <Stack.Screen name="create" options={{ title: 'Create' }} />
      </Stack>
    </Provider>
  );
}