import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
const Ozet = ({title}) => {
  const {t} = useTranslation();
  const context = useContext(MyContext);
  const { tcno,theme } = context;
  const perPage = 10; // Sayfa başına gösterilecek veri sayısı
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('ascending'); // Sıralama yöntemi, varsayılan olarak artan (ascending)
  const [refreshing, setRefreshing] = useState(false); // Yenileme durumu

  const getUserTransactions = async (tcno, page, sort) => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    try {
      const response = await axios.get(`${apiAddress}/users/user-transactions`, {
        params: {
          tcno: tcno,
          page: page,
          sort: sort, // Sıralama yöntemini isteğe bağlı olarak gönder
        },
      });

      const { data } = response;
      const { transactions: newTransactions, totalPages: newTotalPages } = data;
      
      setTransactions((prevTransactions) => [...newTransactions, ...prevTransactions]); // Verilerin başına ekleme yaparak yeni verileri en üstte göster
      setTotalPages(newTotalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Sorgu sırasında bir hata oluştu:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserTransactions(tcno, currentPage, sortOrder); // İlk yükleme işlemi
  }, []);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      getUserTransactions(tcno, nextPage, sortOrder); // Yeni sayfayı yükle
      setCurrentPage(nextPage);
    }
  };

  const renderTransactionItem = ({ item, index }) => {
    const tarih = new Date(item.tarih);
    const day = tarih.getDate();
    const month = tarih.getMonth() + 1;
    const year = tarih.getFullYear();
    const formattedTarih = `${day}/${month}/${year} `;

    return (
      <View style={[styles.transactionItem,{backgroundColor: theme === 'dark' ? '#323232':"white",borderWidth:1,borderColor: theme ==='dark'? "white" :"black"}]}>
        <Text style={[styles.transactionText,{color: theme === 'dark' ? "white":"black"}]}>{formattedTarih}</Text>
        <Text style={[styles.transactionText,{color: theme === 'dark' ? "white":"black"}]}> -{item.satilanparatutari}  </Text>
        <Text style={[styles.transactionText,{color: theme === 'dark' ? "white":"black"}]}>{item.alinacakparatutari}</Text>
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

  const toggleVisibility = async () => {
    if (!visible) {
      setCurrentPage(1);
      setTransactions([]);
      await getUserTransactions(tcno, 1, sortOrder);
    }
    setVisible(!visible);
  };

  const toggleSortOrder = async () => {
    const newSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    setTransactions([]);
    setIsLoading(true);
    await getUserTransactions(tcno, 1, newSortOrder);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUserTransactions(tcno, 1, sortOrder);
    setRefreshing(false);
  };

  return (
    <View style={[styles.container,{backgroundColor: theme === 'dark' ? '#1e1e1e':"rgb(218, 231, 237)"}]}>
      <TouchableOpacity  onPress={toggleVisibility}>
        <View style={[styles.header,{backgroundColor:theme === 'dark' ? '#323232':"white",borderWidth:1,borderColor: theme ==='dark'? "white" :"black" }]}>
          <Text style={[styles.headerText,{color: theme === 'dark' ? "white": "black"}]}>{title} </Text>
          <Text style={[styles.headerText,{color: theme === 'dark' ? "white": "black"}]}>{visible ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {visible && (
        <View>
          <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
            <Text style={styles.sortButtonText}>
              {t('Sorting')}: {sortOrder === 'ascending' ? `${t('Ascending')}` : `${t('Descending')}`}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: 24,
    fontWeight: 'bold',
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
  sortButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Ozet;
