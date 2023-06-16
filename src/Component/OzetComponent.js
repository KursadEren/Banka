import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';

const Ozet = () => {
  const context = useContext(MyContext);
  const { tcno } = context;
  const perPage = 10; // Sayfa başına gösterilecek veri sayısı
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const getUserTransactions = async (tcno, page) => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    try {
      const response = await axios.get(`${apiAddress}/users/user-transactions`, {
        params: {
          tcno: tcno,
          page: page,
        },
      });

      // Yanıttan verileri al
      const { data } = response;
      const { transactions: newTransactions, totalPages: newTotalPages } = data;

      // Alınan verileri mevcut verilere ekle
      setTransactions((prevTransactions) => [...prevTransactions, ...newTransactions]);
      setTotalPages(newTotalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Sorgu sırasında bir hata oluştu:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // İlk veri yükleme işlemi
    getUserTransactions(tcno, currentPage);
  }, []);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      getUserTransactions(tcno, nextPage);
      setCurrentPage(nextPage);
    }
  };

  const renderTransactionItem = ({ item, index }) => {
    return (
      <View style={styles.transactionItem}>
        <Text style={styles.transactionText}> {item.tarih}</Text>
        <Text style={styles.transactionText}> -{item.satilanparatutari} {item.satilanparatipi} </Text>
        <Text style={styles.transactionText}>{item.alinacakparatutari}</Text>
        {/* Diğer bilgileri de göster */}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#999999" />
        ) : null}
      </View>
    );
  };

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity onPress={toggleVisibility}>
        <View style={[styles.card, { flex: visible ? 1 : 0 }]}>
          <Text style={{fontSize:20,textAlign:'center'}}>Son İşlemler</Text>
          <Text style={{fontSize:20,textAlign:'center'}}>+</Text>
        </View>
      </TouchableOpacity>
      </View>

      {visible && (
        
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 231, 237)',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    
    
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default Ozet;
