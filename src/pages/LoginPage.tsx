import React from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { loginProps } from "../types/LoginProps";
import { instance } from "../utils/axios";

function LoginPage() {
  const { email } = useInput({ initialValue: "", tag: "email" });
  const { password } = useInput({ initialValue: "", tag: "password" });
  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginData: loginProps = {
        email: email.value,
        password: password.value,
      };
      const { data } = await instance.post("users/login", loginData);
      localStorage.setItem("token", data.token);
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; 이거 왜 안됐었을까?
      //axios 인스턴스 만드는 걸로 변경함
      navigate("/");
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
    </div>
  );
}

export default LoginPage;
