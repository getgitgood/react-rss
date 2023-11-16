import classes from './Input.module.scss';
import { InputProps } from '../../types';

export default function Input({ setLocalKeyword, localKeyword }: InputProps) {
  const handleLocalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('searchStr', newKeyword);
    setLocalKeyword(newKeyword);
  };

  return (
    <input
      className={classes.input}
      placeholder="Search"
      value={localKeyword}
      onChange={handleLocalInput}
      aria-label="search games"
      type="text"
      name="game"
    ></input>
  );
}
