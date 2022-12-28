import { atom } from "recoil";

const tokenState = atom<string>({
  key: 'tokenState',
  default: localStorage.getItem("jwt") || ""
});

export default tokenState