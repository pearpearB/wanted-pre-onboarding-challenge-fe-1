import React from "react";
import { useInput } from "../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import { loginProps } from "../types/types";
import { instance } from "../utils/axios";
import { useRecoilState } from "recoil";
import { LoginState } from "../utils/recoil";

function LoginPage() {
  const navigate = useNavigate();
  const { email } = useInput({ initialValue: "", tag: "email" });
  const { password } = useInput({ initialValue: "", tag: "password" });
  const [isLogin, setLogin] = useRecoilState(LoginState);

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginData: loginProps = {
        email: email.value,
        password: password.value,
      };
      const { data } = await instance.post("users/login", loginData);
      localStorage.setItem("token", data.token);
      if (localStorage.getItem("token")) setLogin(true);
      navigate("/todos");
    } catch {
      console.log("Error!");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input type="email" value={email.value} onChange={email.onChange} />
        <input
          type="password"
          value={password.value}
          onChange={password.onChange}
        />
        <button type="submit">로그인</button>
      </form>
      <Link to="/join">가입이 필요하신가요?</Link>
    </div>
  );
}

export default LoginPage;
