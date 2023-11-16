import Button from '../Button/Button';
import { useContext, useRef, useState } from 'react';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';
import { Form, useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../Select/SelectInput';
import { AppContext } from '../Context/Context';

export function SearchForm() {
  const { keyword, setKeyword } = useContext(AppContext);
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const formRef = useRef<HTMLFormElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();

  const submitHandler = () => {
    localStorage.setItem('searchStr', localKeyword);
    setKeyword(localKeyword);
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
