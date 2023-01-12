import { useState } from "react";

interface inputProps {
  initialValue: string;
  tag: string;
}

export const useInput = ({ initialValue, tag }: inputProps) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return { [tag]: { value, onChange } };
};
