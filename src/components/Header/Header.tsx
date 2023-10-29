import { Component } from 'react';
import ErrorButton from '../ErrorButton/ErrorButton';
import SearchForm from '../SearchForm/SearchForm';

export default class Header extends Component<{
  keyword: string;
  requestCb: (str: string) => void;
  setErrorStateCb: () => void;
}> {
  render() {
    return (
      <header className="header">
        <h1>Welcome to API</h1>
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
