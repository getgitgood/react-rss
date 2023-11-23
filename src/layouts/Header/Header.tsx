import { SearchForm } from '../../components/SearchForm/SearchForm';
import Link from 'next/link';
import classes from './Header.module.scss';
import ErrorButton from '../../components/ErrorButton/ErrorButton';

export default function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.heading}>
        This project using the &nbsp;
        <Link className={classes.link} href="https://rawg.io/apidocs">
          RAWG API &nbsp;
        </Link>
        to display the
        <br /> videogames highest-ranked by Metacritic&apos;s site.
      </h1>
      <SearchForm />
      <ErrorButton />
    </header>
  );
}
