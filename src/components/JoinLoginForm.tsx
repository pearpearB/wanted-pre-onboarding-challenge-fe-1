import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginProps } from '../types/types';
import { useActionReq } from '../hooks/useActionReq';
import { useInput } from '../hooks/useInput';
import { useLoginValidator } from '../hooks/useLoginValidator';

interface JoinLoginFormProps {
  id: 'join-form' | 'login-form';
  value: '회원가입' | '로그인';
  onSubmit: string;
  onSuccess: string;
  onNext?: (token: string) => void;
}

export default function JoinLoginForm({
  id,
  value,
  onSubmit,
  onSuccess,
  onNext,
}: JoinLoginFormProps) {
  const { error, data, onRequestHandler } = useActionReq(onSubmit);
  const { value: email, onChange: emailChanger } = useInput('');
  const { value: password, onChange: passwordChanger } = useInput('');
  const body = { email, password };
  const { isValid, message } = useLoginValidator(body);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') inputRefs.current[1].focus();
  };

  if (data) {
    if (onNext) onNext(data.token);
    navigate(onSuccess);
  }

  if (error.state) console.log(error.message);

  return (
    <form id={id}>
      <input
        type='email'
        placeholder='email'
        value={email}
        onChange={emailChanger}
        onKeyDown={pressEnterKey}
        ref={(ref: HTMLInputElement) => (inputRefs.current[0] = ref)}
      />
      <br />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={passwordChanger}
        ref={(ref: HTMLInputElement) => (inputRefs.current[1] = ref)}
      />
      <br />
      {message && <div>{message}</div>}
      <button onClick={() => onRequestHandler(body)} disabled={!isValid}>
        {value}
      </button>
    </form>
  );
}
