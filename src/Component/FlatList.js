import React,{useContext,useState,useEffect} from 'react';
import { View, FlatList, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';



const MyFlatList = () => {
    const [userInfo,setUserInfo ] = useState([]);
    const [name,setname] = useState(' ');
    useEffect(() => {
        updateSayfa('HomeScreen');
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
        axios
          .get(`${apiAddress}/users/hesap/${email}`)
          .then((response) => {
            if (response.status === 200) {
                setname(response.data[1].fullname)
                setUserInfo(response.data)
              console.log(response.data);
            } else {
              console.error(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

  const context = useContext(MyContext);
  const { sayfa, updateSayfa, email, updateEmail, password, updatePassword, fullname, updateFullname, userinfo, updateUserinfo } = context;


  const Item =({title,hesapno}) =>{
    return( 
     <View style={style.SliderContainer}>
      
       <Text>
        {title},
        {hesapno}
       </Text>
       
     </View>

)
}

return(
<FlatList
   horizontal={true}
   showsHorizontalScrollIndicator={false} 
   snapToInterval={Dimensions.get('window').width}
   decelerationRate="fast"
   style={style.flatlistt}
   data={userInfo}
 
   keyExtractor={item => item.id}
   renderItem={({item}) => {
    
    return(
      <TouchableOpacity style={style.TouchableOpacityCon} >
        <View style={{borderRadius:10}}>
        
      <Item title={item.hesapadi} hesapno={item.hesapno} />
      
      </View>
      </TouchableOpacity>
    )
  }}
  
  />
);
};

const style = StyleSheet.create({
    listItemContainer:{
      marginTop:'10%',
      marginHorizontal:"10%",
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      
    }
      ,SliderContainer:{
        width:300,
        height:200
      },
      TouchableOpacityCon:{
       
          },
          imageBackground:{
           
          }
  })

export default MyFlatList;
