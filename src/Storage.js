import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = "https://www.floatrates.com/daily/usd.json";

const persist = (config, options) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      if (options.storage) {
        options.storage.setItem(options.key, JSON.stringify(get()));
      }
    },
    get,
    api
  );

const useCurrencyStore = create(
  persist(
    (set) => ({
      rates: [],
      setRates: (newRates) => set({ rates: newRates }),
      fetchCurrencyRates: async () => {
        try {
          const response = await axios.get(url);
          const data = response.data;
          const formattedRates = Object.values(data).map((rate) => ({
            countryName: rate.name,
            currencyName: rate.code,
            conversionRate: rate.rate,
            lastUpdate: new Date(rate.date),
          }));
          set({ rates: formattedRates });
        } catch (error) {
          console.error("Error fetching currency rates", error);
        }
      },
    }),
    {
      key: "currencyRates",
      storage: AsyncStorage,
    }
  )
);

export default useCurrencyStore;
