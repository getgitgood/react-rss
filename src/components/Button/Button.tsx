import classes from './Button.module.scss';
import { ButtonProps } from '../../types';

export default function Button({ buttonText, callback }: ButtonProps) {
  return (
    <>
      <button
        type="submit"
        onClick={callback}
        className={classes.submit_button}
      >
        {buttonText}
      </button>
    </>
  );
}
