import Button from '../Button/Button';
import { FormEvent, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import SelectInput from '../Select/SelectInput';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';

export function SearchForm() {
  const [localKeyword, setLocalKeyword] = useState('');
  const { pageSize } = useAppSelector((state) => state.userInputs);
  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = gameInputHandler(e);
    const isEmptySearch = inputValue === '';
    router.push(
      {
        pathname: `/`,
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
    <form onSubmit={submitHandler} className={classes.search_form}>
      <Input {...{ setLocalKeyword, localKeyword }} />
      <SelectInput />
      <Button buttonText={'Search'} />
    </form>
  );
}
