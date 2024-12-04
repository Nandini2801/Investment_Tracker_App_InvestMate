import { useQuery } from "react-query";
import { cutomStocksApi } from "../utils/apis";

export const getStocks = async () => {
  const res = await cutomStocksApi.get(`/`);
  return res.data;
};

export default function useCustomStocks() {
  return useQuery([], () => getStocks());
}



