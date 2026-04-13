import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// 1. Định nghĩa kiểu dữ liệu
export type PetType = {
  id: string;
  name: string;
  price: string;
  imageSource: any; 
};

// 2. Component vẽ 1 dòng thú cưng (PetItem)
function PetItem({ pet }: { pet: PetType }) {
  return (
    <View style={styles.itemContainer}>
      <Image source={pet.imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.price}>{pet.price}</Text>
        <Text style={styles.extraText}>{">> >>"}</Text>
      </View>
    </View>
  );
}

// 3. Dữ liệu các con vật
const PET_DATA: PetType[] = [
  {
    id: '1',
    name: 'Pomeranian trắng',
    price: '3000000 VND',
    imageSource: require('../../../assets/images/img01.jpg'),
  },
  {
    id: '2',
    name: 'Husky Sibir trắng',
    price: '10000000 VND',
    imageSource: require('../../../assets/images/img02.jpg'),
  },
  {
    id: '3',
    name: 'Bulldog',
    price: '4500000 VND',
    imageSource: require('../../../assets/images/img03.jpg'),
  },
  {
    id: '4',
    name: 'Mèo anh lông dài',
    price: '5000000 VND',
    imageSource: require('../../../assets/images/img04.jpg'),
  },
];

// 4. Component chính vẽ toàn bộ danh sách (Screen02)
export default function Screen02() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Thú cưng</Text>
      <FlatList
        data={PET_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PetItem pet={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// 5. CSS (Chứa styles của cả Screen02 và PetItem)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },
  extraText: {
    fontSize: 12,
    color: '#999999',
  }
});