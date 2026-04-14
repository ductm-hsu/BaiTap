import { Stack } from 'expo-router';

export default function Week07Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Bài Tập Tuần 7 - Alert', headerShown: true }} /> 
    </Stack>
  );
}