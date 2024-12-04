import { useQuery } from "react-query";
import { priceApi } from "../utils/apis";

export const getPrices = async () => {
  const res = await priceApi.get(`/`);
  return res.data;
};

export default function usePrices() {
  return useQuery([], () => getPrices());
}

