import axios from "axios";
import { BANK_DETAILS_API, CUSTOM_STOCKS_API, PRICE_API, STOCKS_API, USER_API } from "./constants";

export const stocksApi = axios.create({
  baseURL: STOCKS_API,
});

export const loginApi = axios.create({
  baseURL: `${USER_API}/login`,
});

export const userApi = axios.create({
  baseURL: USER_API,
});

export const bankDetailsApi = axios.create({
    baseURL: BANK_DETAILS_API,
})

export const priceApi = axios.create({
    baseURL: PRICE_API,
})

export const cutomStocksApi = axios.create({
    baseURL: CUSTOM_STOCKS_API,
})