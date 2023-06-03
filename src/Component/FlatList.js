import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import Buttonx from './Button';

const MyFlatList = ({navigation}) => {
  const [userInfo, setUserInfo] = useState([]);
  const [name, setName] = useState(' ');
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    updateSayfa('HomeScreen');
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .get(`${apiAddress}/users/hesap/${email}`)
      .then((response) => {
        if (response.status === 200) {
          setName(response.data[1].fullname);
          setUserInfo(response.data);
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

  const Item = ({ title, hesapno }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{hesapno}</Text>
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
            <Item title={item.hesapadi} hesapno={item.hesapno} />
          </TouchableOpacity>
        )}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
      />
      
      <View style={styles.pagination}>
      <View style={{marginRight:"20%"}}>
         <Buttonx label="+" navigation={navigation}/> 
         </View>
        {userInfo.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentIndex && styles.paginationDotActive]}
          />
        ))}
        <View style={{marginLeft:"20%"}}>
         <Buttonx label="+" navigation={navigation}/>
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
  flatList: {
    flexGrow: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  itemContainer: {
    width: Dimensions.get('window').width - 40,
    height: 160,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemSubtitle: {
    fontSize: 16,
    color: '#888888',
  },
  touchableOpacityContainer: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
});

export default MyFlatList;
