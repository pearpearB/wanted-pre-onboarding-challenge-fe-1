import { useNavigate } from 'react-router-dom';
import { loginProps } from '../types/types';
import instance from '../utils/axios';
import JoinLoginForm from '../components/JoinLoginForm';

function JoinPage() {
  const navigate = useNavigate();

  const onRequestHandler = async (body: loginProps) => {
    try {
      const { data } = await instance.post('users/create', body);
      navigate('/auth');
    } catch (e: any) {
      console.log(e.response.data.details);
    }
  };

  return (
    <main>
      <JoinLoginForm
        id='join-form'
        value='회원가입'
        onRequest={onRequestHandler}
      />
    </main>
  );
}

export default JoinPage;
