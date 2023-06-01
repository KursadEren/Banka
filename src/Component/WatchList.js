import React, { useState } from 'react';
import { View } from 'react-native';
import { DataTable, RadioButton } from 'react-native-paper';

const WatchList = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const currencies = [
    { id: 'usd', name: 'Amerikan Doları' },
    { id: 'eur', name: 'Euro' },
    { id: 'gbp', name: 'İngiliz Sterlin' },
    { id: 'chf', name: 'İsviçre Frangı' },
  ];

  const handleCurrencySelect = (id) => {
    setSelectedCurrency(id);
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Döviz Birimi</DataTable.Title>
          <DataTable.Title>Seç</DataTable.Title>
        </DataTable.Header>

        {currencies.map((currency) => (
          <DataTable.Row key={currency.id}>
            <DataTable.Cell>{currency.name}</DataTable.Cell>
            <DataTable.Cell>
              <RadioButton
                value={currency.id}
                status={selectedCurrency === currency.id ? 'checked' : 'unchecked'}
                onPress={() => handleCurrencySelect(currency.id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default WatchList;
