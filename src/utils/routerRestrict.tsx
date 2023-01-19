import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "./recoil";

export function PrivateRouter() {
  const isLogin = useRecoilValue(LoginState);

  return isLogin ? <Outlet /> : <Navigate to="/auth" />;
}

export function IsUserRedirect() {
  const isLogin = useRecoilValue(LoginState);

  return isLogin === false ? <Outlet /> : <Navigate to="/" />;
}
