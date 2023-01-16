import React from "react";
import { useInput } from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginProps } from "../types/types";

function JoinPage() {
  const { email } = useInput({ initialValue: "", tag: "email" });
  const { password } = useInput({ initialValue: "", tag: "password" });
  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const JoinData: loginProps = {
        email: email.value,
        password: password.value,
      };
      const {
        data: { token },
      } = await axios.post("users/create", JoinData);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/auth");
    } catch {}
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default JoinPage;
