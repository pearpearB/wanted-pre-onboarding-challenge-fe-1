import JoinLoginForm from '../components/JoinLoginForm';

function JoinPage() {
  return (
    <main>
      <JoinLoginForm
        id='join-form'
        value='회원가입'
        onSubmit='users/create'
        onSuccess='/auth'
      />
    </main>
  );
}

export default JoinPage;
