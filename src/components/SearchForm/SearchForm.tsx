import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate } from 'react-router-dom';

export function SearchForm() {
  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchStr') || ''
  );
  const navigate = useNavigate();

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('searchStr', newKeyword);
    setKeyword(newKeyword);
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(`game=${keyword}&page=1`);
  };
  return (
    <Form onSubmit={submitHandler} className={classes.search_form}>
      <Input searchStr={keyword} onChange={handleKeywordChange} />
      <Button buttonText={'Search'} />
    </Form>
  );
}
