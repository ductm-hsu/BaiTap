import { Image, StyleSheet, View } from 'react-native';

export default function Screen01() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/vus_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b81c22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 200,
  },
});