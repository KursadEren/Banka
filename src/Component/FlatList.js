import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions,Alert } from 'react-native';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import Buttonx from './Button';
import { useTranslation } from 'react-i18next';
const MyFlatList = ({navigation,OnChangeButton}) => {
  const {t} = useTranslation();
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState(' ');
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const context = useContext(MyContext);
  const {tcno,theme,updateTcno, sayfa, updateSayfa, email, updateEmail, password, updatePassword, fullname, updateFullname, userinfo, updateUserinfo } = context;
  
  const handleAddAccount = () => {
    
    navigation.navigate('HesapEkle');
  };
  

  const fetchData = async () =>{
    updateSayfa('HomeScreen');
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;





     await axios .get(`${apiAddress}/users/hesap/${tcno}`)
      .then((response) => {
        if (response.status === 200) {
         
          setName(response.data[0].fullname);
          setUserInfo(response.data);
          
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        
          Alert.alert(
            `${t('Notification')}`,
            `${t('AccountAdditionRequired')}`,
            [
              { text: `${t('AddAccount')}`, onPress: handleAddAccount },
            ]
          );
          
        
       
      });
  }
  
  
  useEffect(() => {
   
  if(sayfa ==='HomeScreen')
  fetchData()
  }, [sayfa]);

 

  const Item = ({ title, iban,subeadi,hesapbakiye,dovizad}) => {
    
    return (
      <View style={[styles.itemContainerr,{backgroundColor:  theme === 'dark'? `#323232`: `rgb(6, 70, 115)`}]}>
      <View style={{flex:1,width:'100%',alignItems:"flex-start"}}>
      <Text style={styles.itemSubtitle}>  {subeadi}</Text>
      <Text style={{color:'white', textAlign:"left"}}>  {iban} </Text>
      
      </View>
     
      <Text style={styles.itemTitle}>{title}</Text>

      <View style={{alignItems:"flex-start",flex:1,width:"100%",justifyContent:"flex-end",marginBottom:'2%'}}>
      <Text style={styles.itemSubtitle}>  {t('Balance')} </Text>
      <Text style={styles.itemSubtitle}>  {hesapbakiye} <Text style={{fontSize:20}}>{dovizad}</Text> </Text>
      </View>
    </View>
    );
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffset / viewSize);
    setCurrentIndex(index);
  };

  const handleScrollEnd = () => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  };


  

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.flatList}
        data={userInfo}
        
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.touchableOpacityContainer}>
            <Item title={item.fullname} dovizad={item.dovizadi} hesapbakiye={item.hesapbakiye} subeadi={item.subeadi} iban={item.iban} />
          </TouchableOpacity>
        )}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
      />
      
      <View style={styles.pagination}>
      
        
        
         
        {userInfo.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentIndex && styles.paginationDotActive]}
          />
          
        ))}
        
       
      </View>
      <View style={styles.paginationn}>
      <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
            <View>
               <Text style={{textAlign:"center",color: theme === 'dark' ? 'white':"black"}}>{t('EditAccount')} </Text>
            </View>
            <View>
                <Buttonx label="-" icon="create-outline" OnChangeButton={OnChangeButton} navigation={navigation}/>
            </View>
            </View>
      <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
            <View>
              <Text style={{textAlign:"center",color: theme === 'dark' ? 'white':"black"}}>{t('AddAccount')} </Text>
            </View>
            <View>
              <Buttonx label="+" icon="add-circle" OnChangeButton={OnChangeButton} navigation={navigation}/>
            </View>
      </View>
      <View  style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
           <View style={{}}>
              <Text style={{textAlign:"center",color: theme === 'dark' ? 'white':"black"}}>{t('Transactions')}</Text>
           </View>
           <View>
              <Buttonx label="islemler" icon="cog" OnChangeButton={OnChangeButton} navigation={navigation}/>
           </View>
           </View>
      </View>
        
     
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: '10%',
    
  },
  container:{flex:1},
  flatList: {
    flexGrow: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.18,
    
  },
  itemContainerr: {
    width: Dimensions.get('window').width - 40,
    height: '100%',
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems:"center",
    elevation: 5,
    backgroundColor:"rgb(6, 70, 130)"

  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"white",
  },
  itemSubtitle: {
    fontSize: 16,
    color:"white",
  },
  touchableOpacityContainer: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
   justifyContent:"center",
    marginTop: 10,
    alignItems:"center",
    
    flex:0.1
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
    
  },
  paginationDotActive: {
    backgroundColor: 'black',
    
  },
  paginationn:{
    flexDirection: 'row',
    justifyContent:"space-around",
     marginTop: 10,
     alignItems:"center",
     
     flex:1
  }
});

export default MyFlatList;
