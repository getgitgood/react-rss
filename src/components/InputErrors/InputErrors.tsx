import classes from '../../styles/Form.module.scss';

export type InputErrorProps = {
  message: string | undefined;
};

export default function InputErrors({ message }: InputErrorProps) {
  return <p className={classes.form_error}>{message}</p>;
}
