import Button from '../Button/Button';
import { FormEvent, useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import SelectInput from '../Select/SelectInput';
import { updateSearchStr } from '../../features/userInputs/userInputsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRouter } from 'next/router';

export function SearchForm() {
  const { searchStr, pageSize } = useAppSelector((state) => state.userInputs);
  const [localKeyword, setLocalKeyword] = useState(searchStr);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = gameInputHandler(e);
    const isEmptySearch = inputValue === '';
    dispatch(updateSearchStr(inputValue));
    localStorage.setItem('searchStr', localKeyword);
    router.push(
      {
        pathname: `/games/[search]`,
        query: {
          search: inputValue,
          page: '1',
          isEmpty: isEmptySearch,
          page_size: pageSize
        }
      },
      `/games/${inputValue || 'all'}?page=1`
    );
  };

  const gameInputHandler = (e: FormEvent<HTMLFormElement>): string => {
    const form = e.currentTarget;
    const gameInput = form.elements.namedItem('game') as HTMLInputElement;
    const currentGameInputValue = gameInput.value;
    return currentGameInputValue;
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitHandler}
      className={classes.search_form}
    >
      <Input {...{ setLocalKeyword, localKeyword }} />
      <SelectInput />
      <Button buttonText={'Search'} />
    </form>
  );
}
