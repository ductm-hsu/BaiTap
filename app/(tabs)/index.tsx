import { View } from 'react-native';

// Import các bài tập từ các tuần khác nhau
//import Intro from '../../src/components/week01/intro';
//import Screen01 from '../../src/components/week02/screen01';
import Screen02 from '../../src/components/week02/screen02';

export default function App() {
  return (
    <View style={{ flex: 1 }}>      
      <Screen02 /> 
      {/* <Intro /> */}
      {/* <Screen01 /> */}
      {/* <Screen02 /> */}
    </View>
  );
}