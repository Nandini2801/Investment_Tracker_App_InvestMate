import { useQuery } from "react-query";
import { stocksApi } from "../utils/apis";
import { RAPIDAPI_HOST_STOCKS, RAPIDAPI_KEY_STOCKS } from "../utils/constants";

export const getStocks = async (index) => {
  stocksApi.defaults.headers.common["X-RapidAPI-Key"] = RAPIDAPI_KEY_STOCKS;
  stocksApi.defaults.headers.common["X-RapidAPI-Host"] = RAPIDAPI_HOST_STOCKS;
  const res =
    index === undefined
      ? await stocksApi.get(`/any`)
      : await stocksApi.get(`/price`, { params: { Indices: index } });

  return res.data;
};

export default function useStocks(index) {
  return useQuery(["index"], () => getStocks(index));
}

