import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import MainPage from "../pages/MainPage";
import TodoDetailPage from "../pages/TodoDetailPage";
import TodoPage from "../pages/TodoPage";
import { LoginState } from "../utils/recoil";

interface LoginCheckerProps {
  children: React.ReactNode;
}

function LoginChecker({ children }: LoginCheckerProps) {
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);
  return isLogin ? (
    <Routes>
      <Route path="/todos" element={<TodoPage />}>
        <Route path=":id" element={<TodoDetailPage />} />
      </Route>
      <Route path="/" element={<MainPage />} />
    </Routes>
  ) : (
    <>{children}</>
  );
}

export default LoginChecker;
