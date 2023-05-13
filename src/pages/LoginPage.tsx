import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginProps } from '../types/types';
import { LoginState } from '../utils/recoil';
import instance from '../utils/axios';
import JoinLoginForm from '../components/JoinLoginForm';

function LoginPage() {
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const navigate = useNavigate();

  const onRequestHandler = async (body: loginProps) => {
    try {
      const { data } = await instance.post('users/create', body);
      localStorage.setItem('wanted-token', data.token);
      if (localStorage.getItem('token')) setLogin(true);
      navigate('/todos');
    } catch (e: any) {
      console.log(e.response.data.details);
    }
  };

  return (
    <main>
      <JoinLoginForm
        id='login-form'
        value='로그인'
        onRequest={onRequestHandler}
      />
      <Link to='/join'>가입이 필요하신가요?</Link>
    </main>
  );
}

export default LoginPage;
