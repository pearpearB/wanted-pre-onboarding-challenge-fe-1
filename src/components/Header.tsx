import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { LoginState } from "../utils/recoil";
const LoginButton = styled.button`
  width: 3rem;
  height: 1.2rem;
  font-size: 0.2rem;
  background-color: white;
  border: 1px solid black;
  :hover {
    background: #e7e7e7;
    cursor: pointer;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.span`
  font-size: 2rem;
  margin: auto;
`;

function Header() {
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  };
  return (
    <Container>
      {isLogin ? (
        <LoginButton onClick={onLogoutHandler}> Log out</LoginButton>
      ) : (
        <Link to="/auth">
          <LoginButton>Log in</LoginButton>
        </Link>
      )}
      <Title>Todo List</Title>
    </Container>
  );
}

export default Header;
