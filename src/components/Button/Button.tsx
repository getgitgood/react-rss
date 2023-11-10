import { ButtonProps } from '../../types';
import classes from './Button.module.scss';

export default function Button({ buttonText }: ButtonProps) {
  return (
    <>
      <button type="submit" className={classes.submit_button}>
        {buttonText}
      </button>
    </>
  );
}
