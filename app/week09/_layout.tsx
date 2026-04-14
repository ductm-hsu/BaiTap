import { Stack } from 'expo-router';

export default function Week09Layout() {
  return (
    <Stack>
      {/* Tắt header mặc định của Stack vì chúng ta đã tự code header màu tím */}
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
    </Stack>
  );
}