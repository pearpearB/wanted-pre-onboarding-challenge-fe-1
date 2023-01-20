import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { LoginState } from "../utils/recoil";

const MainContainer = styled.div``;
const H1 = styled.h1`
  color: #2e2efe;
`;

function MainPage() {
  const isLogin = useRecoilValue(LoginState);
  return (
    <MainContainer>
      <Link to="/todos">
        <H1>Welcome!</H1>
      </Link>
      {isLogin ?? <div>로그인....필요...서비스..</div>}
    </MainContainer>
  );
}

export default MainPage;
