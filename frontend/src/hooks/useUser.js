import { useQuery } from "react-query";
import { userApi } from "../utils/apis";

export const getUsers = async (userId) => {
  const res = await userApi.get(`/${userId}`);
  return res.data;
};

export default function useUsers(userId) {
  return useQuery(["userId"], () => getUsers(userId));
}


