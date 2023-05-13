import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginState } from '../utils/recoil';
import JoinLoginForm from '../components/JoinLoginForm';

function LoginPage() {
  const [isLogin, setLogin] = useRecoilState(LoginState);

  const fetchNextHandler = (token: string) => {
    localStorage.setItem('wanted-token', token);
    if (localStorage.getItem('token')) setLogin(true);
  };

  return (
    <main>
      <JoinLoginForm
        id='login-form'
        value='로그인'
        onSubmit='users/create'
        onSuccess='/todos'
        onNext={fetchNextHandler}
      />
      <Link to='/join'>가입이 필요하신가요?</Link>
    </main>
  );
}

export default LoginPage;
