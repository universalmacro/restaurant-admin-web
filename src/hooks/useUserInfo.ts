import axios from "axios";
import { useQuery } from "react-query";
import { UserInfo } from "../types/userInfo";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";



const fetchUserInfo = async (key?: string): Promise<UserInfo> => {
  const { data } = await axios.get("/api/user-info", { params: { key } });
  return data;
};

export function useUserInfo(key?: string) {

  // 暫時只根據 localstorage 的 token 判斷登入，後期改為請求 userinfo 
  // 處理 token 過期的情況
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");
  useEffect(() => {
    if (authKey == '') {
      setAuthKey(localStorage.getItem("authkey"));
    }
  }, [])

  console.log("useUserInfo-authkey", authKey, localStorage.getItem("authkey"));
  if (authKey !== '') {
    return {
      data: {
        id: '1',
        email: 'aa@aa.com',
        firstName: 'aa',
        job: 'aa',
        lastName: 'aa',
        progress: 1,
        role: 'admin',

      }
    };
  } else {
    return null;
  }


  // return useQuery(["user-info", key], () => fetchUserInfo(key), {
  //     enabled: !!key,
  // });
}
