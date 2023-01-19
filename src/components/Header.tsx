import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { LoginState } from "../utils/recoil";
const LoginButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 0.2rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 2rem;
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
