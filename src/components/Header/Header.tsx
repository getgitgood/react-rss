import SearchForm from '../SearchForm/SearchForm';
import classes from './Header.module.scss';
import { SearchFormProps } from '../../types';
import ErrorButton from '../ErrorButton/ErrorButton';

export default function Header({ searchStr, sendRequest }: SearchFormProps) {
  return (
    <header>
      <h1 className={classes.heading}>
        Welcome to videogames API. This project using the
        <a href="https://rawg.io/apidocs"></a> RAWG API to display the most
        <br />
        high-ranked videogames on Metacritic site by entered keyword. Please,
        type your request below.
      </h1>
      <SearchForm searchStr={searchStr} sendRequest={sendRequest} />
      <ErrorButton buttonText="Throw an error" />
    </header>
  );
}
