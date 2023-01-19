import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import TodoPage from "./pages/TodoPage";
import styled from "styled-components";
import Header from "./components/Header";
import { ReactQueryDevtools } from "react-query/devtools";
import TodoDetailPage from "./pages/TodoDetailPage";
import { IsUserRedirect, PrivateRouter } from "./utils/routerRestrict";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Routes>
          <Route path="/auth" element={<IsUserRedirect />}>
            <Route path="/auth" element={<LoginPage />} />
          </Route>
          <Route path="/join" element={<IsUserRedirect />}>
            <Route path="/join" element={<JoinPage />} />
          </Route>
          <Route path="todos" element={<PrivateRouter />}>
            <Route path="/todos" element={<TodoPage />}>
              <Route path=":id" element={<TodoDetailPage />} />
            </Route>
          </Route>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Container>
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  );
}

export default App;
