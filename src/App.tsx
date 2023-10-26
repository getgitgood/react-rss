import { Component, ReactNode } from 'react';
import './index.scss';
import './components/SearchForm';
import SearchForm from './components/SearchForm';
import PageHeading from './components/PageHeading';
import Content from './components/Content';
import { ResponseItem } from './types';

export default class App extends Component<Record<string, never>> {
  state = {
    keyword: localStorage.getItem('keyword') || '',
    data: [],
  };

  sendRequest = async (str: string) => {
    this.setState({ keyword: str }, () => this.fetchData(str));
  };

  fetchData = async (str: string) => {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };
    try {
      const request = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${str}`,
        requestOptions
      );
      if (request.ok) {
        const data: ResponseItem[] = await request.json();
        this.setState({ data: data });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render(): ReactNode {
    return (
      <>
        <div className="header">
          <PageHeading />
          <SearchForm
            keyword={this.state.keyword}
            sendRequest={this.sendRequest}
          />
        </div>
        <div className="main">
          <Content data={this.state.data} />
        </div>
      </>
    );
  }
}
