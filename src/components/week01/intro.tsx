import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Intro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>React Native</Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.title2}>Mobile development with React Native</Text>
      </View>
      <View style={styles.footer}>
      </View>
    </View>
  );
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f44336'
  },
  header: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424242',
    // textAlign: 'center' // Lưu ý: textAlign không hỗ trợ trực tiếp trên View, mình đã comment lại để tránh cảnh báo
  },
  main: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc046',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c56000',
  },
  title1: {
    color: '#FFF',
    fontSize: 70,
    fontWeight: 'bold'
  },
  title2: {
    color: '#000',
    fontSize: 20
  },
});