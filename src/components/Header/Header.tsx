import { Component } from 'react';
import ErrorButton from '../ErrorButton/ErrorButton';
import SearchForm from '../SearchForm/SearchForm';
import classes from './Header.module.scss';

export default class Header extends Component<{
  keyword: string;
  requestCb: (str: string) => void;
  setErrorStateCb: () => void;
}> {
  render() {
    const { keyword, requestCb, setErrorStateCb } = this.props;
    return (
      <header>
        <h1 className={classes.heading}>
          Welcome to videogames API. This project using the
          <a href="https://rawg.io/apidocs"></a> RAWG API to display the most
          <br />
          high-ranked videogames on Metacritic site by entered keyword. Please,
          type your request below.
        </h1>
        <SearchForm keyword={keyword} sendRequest={requestCb} />
        <ErrorButton text={'Throw an Error'} onClick={setErrorStateCb} />
      </header>
    );
  }
}
