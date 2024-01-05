import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from 'axios';
import { basePath } from "../utils/constant";
import { useUserInfo } from "../hooks/useUserInfo";
import { UserInfo } from "../types/userInfo";

interface AuthContextInterface {
  hasRole: (roles?: string[]) => {};
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  userInfo?: UserInfo | null;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");

  const info = useUserInfo(authKey);
  let userInfo: UserInfo | null = null;
  if (info) {
    userInfo = info.data;
  }

  const hasRole = (roles?: string[]) => {
    if (!roles || roles.length === 0) {
      return true;
    }
    if (!userInfo) {
      return false;
    }
    return roles.includes(userInfo?.role);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${basePath}/sessions`, {
        'email': email,
        'password': password,
      });
      console.log("response", response);
      let { data } = response;
      if (response) {
        console.log("AuthProvider", response);
        setAuthKey(data.token);
        return data.token;
      } else {
        throw new Error('Invalid login');
      }
    } catch (err) {
      throw err;
    }

    // return login({ email, password })
    //   .then((key: string) => {
    //     setAuthKey(key);
    //     return key;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  const handleLogout = async () => {
    setAuthKey("");

  };

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

// import { createContext, useEffect, useReducer } from 'react';
// import axios from 'axios';
// import { basePath } from "../utils/constant";
// // import { RestaurantApi } from "../api";

// // import { MatxLoading } from 'app/components';

// const initialState = {
//   user: null,
//   isInitialised: false,
//   isAuthenticated: false
// } as any;

// // const isValidToken = (accessToken) => {
// //   if (!accessToken) return false;

// //   const decodedToken = jwtDecode(accessToken);
// //   const currentTime = Date.now() / 1000;
// //   return decodedToken.exp > currentTime;
// // };

// // const setSession = (accessToken) => {
// //   if (accessToken) {
// //     localStorage.setItem('accessToken', accessToken);
// //     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// //   } else {
// //     localStorage.removeItem('accessToken');
// //     delete axios.defaults.headers.common.Authorization;
// //   }
// // };

// const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case 'INIT': {
//       const { isAuthenticated, user } = action.payload;
//       return { ...state, isAuthenticated, isInitialised: true, user };
//     }

//     case 'LOGIN': {
//       const { token } = action.payload;
//       console.log("reducer", token);
//       return { ...state, isAuthenticated: true, user: token };
//     }

//     case 'LOGOUT': {
//       return { ...state, isAuthenticated: false, user: null };
//     }


//     default:
//       return state;
//   }
// };

// const AuthContext = createContext({
//   ...initialState,
//   login: () => { },
//   logout: () => { },
// });

// export const AuthProvider = ({ children }: any) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const login = async (email: string, password: string) => {
//     console.log("login", email, password);
//     try {
//       let requestParameters = {
//         createSessionRequest: {
//           'email': email,
//           'password': password,
//         }
//       };
//       // const response = await accountApi.createSession(requestParameters);
//       const response = await axios.post(`${basePath}/sessions`, {
//         'email': email,
//         'password': password,
//       });
//       console.log("response", response);
//       let { data } = response;
//       if (response) {
//         console.log("AuthProvider", response);
//         localStorage.setItem("token", JSON.stringify(data.token));
//         dispatch({ type: 'LOGIN', payload: { data } });
//       } else {
//         throw new Error('Invalid login');
//       }

//     } catch (e) {
//       throw new Error('Invalid login');
//     }

//   };

//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("dispatch-isAuthenticated", token);
//       dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: token } });
//     } else {
//       dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
//     }
//   }, []);

//   // // SHOW LOADER
//   // if (!state.isInitialised) return <MatxLoading />;

//   return (
//     <AuthContext.Provider value={{ ...state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
