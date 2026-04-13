import { Stack } from 'expo-router';

export default function Week03Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="next" options={{ title: 'Next' }} />
      <Stack.Screen name="last" options={{ title: 'Last' }} />
    </Stack>
  );
}