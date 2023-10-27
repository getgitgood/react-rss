import { Component, ReactNode } from 'react';
import './index.scss';
import './components/SearchForm/SearchForm';
import SearchForm from './components/SearchForm/SearchForm';
import ContentItems from './components/Content/Content';
import { ApiResponse, ResponseItem } from './types';

export default class App extends Component {
  state = {
    keyword: localStorage.getItem('keyword') || '',
    data: [],
  };

  sendRequest = async (str: string) => {
    this.setState({ keyword: str }, () => this.fetchData(str));
  };

  fetchData = async (str: string) => {
    const apiKey = '2de256abeb6040da91f0216d56988978';
    try {
      const request = await fetch(
        `https://rawg.io/api/games?token&key=${apiKey}&search=${str}&page_size=3`
      );
      if (request.ok) {
        const response: ApiResponse = await request.json();
        const results: ResponseItem[] = response.results;
        this.setState({ data: results });
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render(): ReactNode {
    return (
      <>
        <div className="header">
          <h1>Welcome to API</h1>
          <SearchForm
            keyword={this.state.keyword}
            sendRequest={this.sendRequest}
          />
        </div>
        <div className="main">
          <ContentItems data={this.state.data} />
        </div>
      </>
    );
  }
}
