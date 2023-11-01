import classes from './Error.module.scss';
import { ButtonProps } from '../../types';
import { useState } from 'react';

export default function ErrorButton({ buttonText }: ButtonProps) {
  const [isError, setError] = useState(false);

  const clickHandler = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('fff');
  }

  return (
    <>
      <button
        type="submit"
        className={classes.error_button}
        onClick={clickHandler}
      >
        {buttonText}
      </button>
    </>
  );
}
