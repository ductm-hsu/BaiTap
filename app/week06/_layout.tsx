import { Stack } from 'expo-router';

export default function Week06Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="promo" options={{ title: 'Bài 2 - Promo Modal' }} />
    </Stack>
  );
}