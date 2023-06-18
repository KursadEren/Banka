import {  StyleSheet   } from 'react-native';
import SignIn from './src/Screen/SignIn';
import SignUp from './src/Screen/SignUp';
import  { MyContextProvider } from './src/Context/Context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import DraverNavigator from './src/Component/DraverNavigator';
import HesapEkle from './src/Screen/HesapEkle';
import Islem from './src/Screen/islem';
import OzetSayfasi from './src/Screen/OzetSayfası';
import Hesapduzenle from './src/Screen/Hesapduzenle';

const Stack = createNativeStackNavigator();
const BetweenNavigator = () =>{
  
 
  
  const transitionAnimation = (props) => {
    const { scene } = props;
    const { position, layout, scene: { progress } } = scene;
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [scene.index - 1, scene.index, scene.index + 1],
      outputRange: [-width, 0, width],
    });
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
    return {
      transform: [{ translateX }],
      opacity,
    };
  };

  return (
    <NavigationContainer>
     
      
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
        cardStyleInterpolator: transitionAnimation,
      }}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="DraverNavigator" component={DraverNavigator} />
        <Stack.Screen name="HesapEkle" component={HesapEkle} />
        <Stack.Screen name="islem" component={Islem} />
        <Stack.Screen name="OzetSayfasi" component={OzetSayfasi} />
        <Stack.Screen name="Hesapduzenle" component={Hesapduzenle} />
        


      </Stack.Navigator>
      
    </NavigationContainer>)
 }
export default function App() {
 
  
  return (
    <MyContextProvider >
       <PaperProvider>
          <BetweenNavigator/>
          </PaperProvider>
    </MyContextProvider>
    
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  appBar:{
    marginTop:'10.5%'
  }
});
