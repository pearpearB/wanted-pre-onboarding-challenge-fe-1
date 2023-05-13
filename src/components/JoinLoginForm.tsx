import { loginProps } from '../types/types';
import { useInput } from '../hooks/useInput';
import { useLoginValidator } from '../hooks/useLoginValidator';
import { useRef } from 'react';

interface JoinLoginFormProps {
  id: 'join-form' | 'login-form';
  value: '회원가입' | '로그인';
  onRequest: (body: loginProps) => void;
}

export default function JoinLoginForm({
  id,
  value,
  onRequest,
}: JoinLoginFormProps) {
  const { value: email, onChange: emailChanger } = useInput('');
  const { value: password, onChange: passwordChanger } = useInput('');
  const body = { email, password };
  const { isValid, message } = useLoginValidator(body);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const pressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') inputRefs.current[1].focus();
  };

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
      <button onClick={() => onRequest(body)} disabled={!isValid}>
        {value}
      </button>
    </form>
  );
}
