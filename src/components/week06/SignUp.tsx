import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './SignIn'; // Tái sử dụng CSS từ file SignIn

export default function SignUp() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <FontAwesome name="user" size={40} color="white" />
          </View>
          <Text style={styles.title}>Sign up</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
          
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Log in</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}