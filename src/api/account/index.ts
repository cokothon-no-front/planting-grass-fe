import axiosInstance from "@/api/AxiosInstance";
import { Account } from "@/meta/accountMeta";

const login = (email: string, password: string) => axiosInstance
  .post("/user/sign-in", {
    id: email,
    password,
  })
  .then((res: any) => {
    const { data } = res;
    console.log("login data", data);
    return data;
  });

const getAccount = () => axiosInstance.get("/user").then((res: any) => {
  const { data } = res;
  console.log("account data", data);
  return data;
});

const register = (account: Account) => axiosInstance
  .put("/user/sign-up", account)
  .then((res: any) => {
    const { data } = res;
    console.log("register data", data);
    return data;
  });

export default {
  login,
  register,
  getAccount
};
