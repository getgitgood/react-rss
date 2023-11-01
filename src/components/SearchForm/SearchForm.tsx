import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { SearchFormProps } from '../../types';

export default function SearchForm({
  searchStr,
  sendRequest,
}: SearchFormProps) {
  const [keyword, setKeyword] = useState(searchStr);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendRequest(keyword);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    localStorage.setItem('searchStr', newKeyword);
  };

  return (
    <>
      <form className={classes.search_form} onSubmit={handleSubmit}>
        <Input searchStr={keyword} onChange={handleKeywordChange} />
        <Button buttonText={'Search'} />
      </form>
    </>
  );
}
