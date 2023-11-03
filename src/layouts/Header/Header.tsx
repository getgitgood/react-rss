import { SearchForm } from '../../components/SearchForm/SearchForm';
import classes from './Header.module.scss';
import ErrorButton from '../../components/ErrorButton/ErrorButton';

export default function Header() {
  return (
    <header>
      <h1 className={classes.heading}>
        Welcome to videogames API. This project using the &nbsp;
        <a href="https://rawg.io/apidocs">RAWG API</a> to display the
        <br /> videogames highest-ranked by Metacritic&apos;s site. Please, type
        your request below.
      </h1>
      <SearchForm />
      <ErrorButton buttonText="Throw an error" />
    </header>
  );
}
