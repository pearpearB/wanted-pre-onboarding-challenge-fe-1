import { Link } from "react-router-dom";
import styled from "styled-components";
const LoginButton = styled.button``;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
function Header() {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <Container>
      <Link to="/auth">
        <LoginButton>Log in</LoginButton>
      </Link>
      <h2>Todo List</h2>
    </Container>
  );
}

export default Header;
