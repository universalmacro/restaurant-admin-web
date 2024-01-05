// import useAuth from '../hooks/useAuth';
// import { Navigate, useLocation } from 'react-router-dom';
// import { GetUrlRelativePath } from "../utils/utils";

// const AuthGuard = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const { pathname } = useLocation();
//   const url = GetUrlRelativePath();

//   console.log("isAuthenticated", url, isAuthenticated);

//   if (isAuthenticated) return <>{children}</>;

//   // if (url !== "/auth/sign-in")
//   //   return <Navigate replace to="/auth/sign-in" state={{ from: pathname }} />;
// };

// export default AuthGuard;
