import { ChangeEvent, Component, FormEvent, ReactNode } from 'react';
import SubmitBtn from './SubmitBtn';
import Input from './Input';

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
        <form className={`search-form`} onSubmit={this.handleSubmit}>
          <Input
            value={this.state.keyword}
            onChange={this.handleKeywordChange}
          />
          <SubmitBtn />
        </form>
      </>
    );
  }
}
