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
    return (
      <header>
        <h1 className={classes.heading}>
          Welcome to videogames API. This project using the
          <a href="https://rawg.io/apidocs"> RAWG API</a>. <br /> Please, type
          your request below.
        </h1>
        <SearchForm
          keyword={this.props.keyword}
          sendRequest={this.props.requestCb}
        />
        <ErrorButton
          text={'Throw an Error'}
          onClick={this.props.setErrorStateCb}
        />
      </header>
    );
  }
}
