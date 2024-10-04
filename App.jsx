import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import CurrencyList from './src/CurrencyList';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <CurrencyList />
    </SafeAreaView>
  );
};

export default App;
