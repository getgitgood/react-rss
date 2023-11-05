import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';

export function SearchForm() {
  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchStr') || ''
  );

  const [limit, setLimit] = useState(localStorage.getItem('pageLimit') || '20');
  const navigate = useNavigate();

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('searchStr', newKeyword);
    setKeyword(newKeyword);
  };

  const handleLimitChange = (selectedLimit: string) => {
    localStorage.setItem('pageLimit', selectedLimit);
    setLimit(selectedLimit);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('searchStr', keyword);
    if (!keyword) {
      navigate(`game=all&page=1`);
      return;
    }
    navigate(`game=${keyword}&page=1`);
  };

  return (
    <Form onSubmit={submitHandler} className={classes.search_form}>
      <Input searchStr={keyword} onChange={handleKeywordChange} />
      <SelectInput onChange={handleLimitChange} value={limit} />
      <Button buttonText={'Search'} />
    </Form>
  );
}
