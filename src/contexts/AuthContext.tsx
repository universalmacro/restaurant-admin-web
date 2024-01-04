import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { basePath } from "../utils/constant";

// import { MatxLoading } from 'app/components';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
} as any;

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }


    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {

    try {
      const response = await axios.post(`${basePath}/sessions`, {
        'email': email,
        'password': password,
      });

      let { data } = response;
      if (data) {
        console.log("AuthProvider", data);
        localStorage.setItem("user", JSON.stringify(data.token));
        dispatch({ type: 'LOGIN', payload: { data } });
      } else {
        throw new Error('Invalid login');
      }

    } catch (e) {
      throw new Error('Invalid login');
    }

  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get('/api/auth/profile');
  //       dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
  //     }
  //   })();
  // }, []);

  // // SHOW LOADER
  // if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
