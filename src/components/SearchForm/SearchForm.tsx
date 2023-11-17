import Button from '../Button/Button';
import { FormEvent, useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';
import { searchStrUpdated } from '../../features/userInputs/userSearch';
import { useAppDispatch, useAppSelector } from '../../hooks';

export function SearchForm() {
  const keyword = useAppSelector((state) => state.searchStr);
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const gameInput = form.elements.namedItem('game') as HTMLInputElement;
    const currentGameInputValue = gameInput.value || 'all';
    dispatch(searchStrUpdated(localKeyword));
    localStorage.setItem('searchStr', localKeyword);
    navigate(`&game=${currentGameInputValue}&page=1`);
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
