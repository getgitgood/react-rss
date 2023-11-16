import Button from '../Button/Button';
import { useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';
import { searchStrUpdated } from '../../features/userSearch';
import { useAppDispatch, useAppSelector } from '../../hooks';

export function SearchForm() {
  const keyword = useAppSelector((state) => state.searchStr);
  const pageSize = useAppSelector((state) => state.pageSize);
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const formRef = useRef<HTMLFormElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const submitHandler = () => {
    localStorage.setItem('pageSize', pageSize);
    localStorage.setItem('searchStr', localKeyword);
    dispatch(searchStrUpdated(localKeyword));
    navigate(`&game=${keyword}&page=${page}`);
  };

  return (
    <Form
      ref={formRef}
      onSubmit={submitHandler}
      className={classes.search_form}
    >
      <Input {...{ setLocalKeyword, localKeyword }} />
      <SelectInput {...formRef} />
      <Button buttonText={'Search'} />
    </Form>
  );
}
