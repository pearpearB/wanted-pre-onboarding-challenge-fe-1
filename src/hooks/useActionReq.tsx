import { useState } from 'react';
import instance from '../utils/axios';
import { loginProps } from '../types/types';

export const useActionReq = (url: string) => {
  const [data, setData] = useState({ message: '', token: '' });
  const [error, setError] = useState({ state: false, message: '' });

  const onRequestHandler = async (body: loginProps) => {
    try {
      const { data } = await instance.post(url, body);
      setData(() => {
        return { message: data.message, token: data.token };
      });
    } catch (e: any) {
      setError(() => ({ state: true, message: e.response.data.details }));
    }
  };

  return { error, data, onRequestHandler };
};
