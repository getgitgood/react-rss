import { ChangeEvent, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form } from 'react-router-dom';
import { makeFetchRequest } from '../../api/apiClient';

export const loader = async () => {
  const query = localStorage.getItem('searchStr') ?? '';
  const data = await makeFetchRequest(query);
  return data;
};

export function SearchForm() {
  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchStr') || ''
  );

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('searchStr', newKeyword);
    setKeyword(newKeyword);
  };

  return (
    <Form method="get" action={'/search'} className={classes.search_form}>
      <Input searchStr={keyword} onChange={handleKeywordChange} />
      <Button buttonText={'Search'} />
    </Form>
  );
}
