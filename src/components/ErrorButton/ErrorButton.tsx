import { ButtonProps } from '../../types';
import { useState } from 'react';

export default function ErrorButton({ buttonText }: ButtonProps) {
  const [isError, setError] = useState(false);

  const clickHandler = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('Ooops');
  }

  return (
    <>
      <button type="submit" onClick={clickHandler}>
        {buttonText}
      </button>
    </>
  );
}
