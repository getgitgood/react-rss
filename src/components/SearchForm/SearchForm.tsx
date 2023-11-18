import Button from '../Button/Button';
import { FormEvent, useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';
import { searchStrUpdated } from '../../features/userInputs/userInputsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export function SearchForm() {
  const { searchStr } = useAppSelector((state) => state.userInputs);
  const [localKeyword, setLocalKeyword] = useState(searchStr);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = gameInputHandler(e);
    dispatch(searchStrUpdated(inputValue));
    localStorage.setItem('searchStr', localKeyword);
    if (inputValue) {
      navigate(`&game=${inputValue}&page=1`);
    } else {
      navigate(`&game=all&page=1`);
    }
  };

  const gameInputHandler = (e: FormEvent<HTMLFormElement>): string => {
    const form = e.currentTarget;
    const gameInput = form.elements.namedItem('game') as HTMLInputElement;
    const currentGameInputValue = gameInput.value;
    return currentGameInputValue;
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
