import { ChangeEvent, Component, ReactNode } from 'react';
import SubmitBtn from './SubmitBtn';
import Input from './Input';

type SearchFormState = {
  keyword: string;
};

export default class SearchForm extends Component<
  Record<string, never>,
  SearchFormState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      keyword: localStorage.getItem('keyword') || '',
    };
  }

  handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    localStorage.setItem('keyword', newKeyword);
    this.setState({ keyword: newKeyword });
  };

  render(): ReactNode {
    return (
      <>
        <form>
          <Input
            value={this.state.keyword}
            onChange={this.handleKeywordChange}
          />
          <SubmitBtn str={this.state.keyword} />
        </form>
        <p>{this.state.keyword}</p>
      </>
    );
  }
}
