import { InputProps } from '../../types';
import classes from './Input.module.scss';

export default function Input({ searchStr, onChange }: InputProps) {
  return (
    <input
      className={classes.input}
      placeholder="Search"
      value={searchStr}
      onChange={onChange}
    ></input>
  );
}
