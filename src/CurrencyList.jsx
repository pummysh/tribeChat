import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import useCurrencyStore from "./Storage";

const CurrencyList = () => {
  const { rates, fetchCurrencyRates } = useCurrencyStore();

  useEffect(() => {
    fetchCurrencyRates();
    const interval = setInterval(() => {
      fetchCurrencyRates();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const maxRateItem = rates.reduce(
    (max, item) => (item.conversionRate > max.conversionRate ? item : max),
    rates[0]
  );

  const minRateItem = rates.reduce(
    (min, item) => (item.conversionRate < min.conversionRate ? item : min),
    rates[0]
  );

  return (
    <View style={styles.container}>
      {maxRateItem && <View style={styles.maxItemContainer}>
        <Text style={styles.maxItemText}>
          Highest Conversion Rate: {maxRateItem?.currencyName} (
          {maxRateItem?.conversionRate})
        </Text>
      </View>}

      {minRateItem && <View style={styles.maxItemContainer}>
        <Text style={styles.maxItemText}>
          Minimum Conversion Rate: {minRateItem?.currencyName} (
          {minRateItem?.conversionRate})
        </Text>
      </View>}

      <FlatList
        data={rates}
        keyExtractor={(item) => item.currencyName}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.text}>Country: {item.countryName}</Text>
              <Text style={styles.text}>Currency: {item.currencyName}</Text>
              <Text style={styles.text}>Rate: {item.conversionRate}</Text>
              <Text style={styles.text}>
                Last Update: {item.lastUpdate.toLocaleString()}
              </Text>
            </View>
          );
        }}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginBottom:20
  },
  maxItemContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom:10
  },
  maxItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
  list:{
    height:"80%",
  }
});

export default CurrencyList;
