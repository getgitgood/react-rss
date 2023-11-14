import Button from '../Button/Button';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';

export function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchStr') || ''
  );

  const [limit, setLimit] = useState(localStorage.getItem('pageLimit') || '20');

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('searchStr', newKeyword);
    setKeyword(newKeyword);
  };

  const handleLimitChange = (selectedLimit: string) => {
    localStorage.setItem('pageLimit', selectedLimit);
    setLimit(selectedLimit);
    formRef.current?.submit();
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const { page } = params;
    localStorage.setItem('searchStr', keyword);
    navigate(`&game=${keyword}&page=${page}`);
  };

  return (
    <Form
      ref={formRef}
      onSubmit={submitHandler}
      className={classes.search_form}
    >
      <Input searchStr={keyword} onChange={handleKeywordChange} />
      <SelectInput onChange={handleLimitChange} value={limit} />
      <Button buttonText={'Search'} />
    </Form>
  );
}
