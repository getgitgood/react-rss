import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './SearchForm.module.scss';

export default class SearchForm extends Component<{
  keyword: string;
  sendRequest: (str: string) => void;
}> {
  state = {
    keyword: this.props.keyword,
  };
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.sendRequest(this.state.keyword);
  };

  handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    this.setState({ keyword: newKeyword });
    localStorage.setItem('keyword', newKeyword);
  };

  render(): ReactNode {
    return (
      <>
        <form className={classes.search_form} onSubmit={this.handleSubmit}>
          <Input
            value={this.state.keyword}
            onChange={this.handleKeywordChange}
          />
          <Button text={'Search'} />
        </form>
      </>
    );
  }
}
