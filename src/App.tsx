import { Component, ReactNode } from 'react';
import './index.scss';
import './components/SearchForm/SearchForm';
import SearchForm from './components/SearchForm/SearchForm';
import Content from './components/Content/Content';
import { ApiResponse, ResponseItem } from './types';

export default class App extends Component {
  state = {
    keyword: localStorage.getItem('keyword') || '',
    data: [],
    isLoading: false,
  };

  sendRequest = (str: string) => {
    this.setState({ keyword: str }, () => this.fetchData(str));
  };

  fetchData = async (str: string) => {
    const apiKey = '2de256abeb6040da91f0216d56988978';
    this.setState({ isLoading: true });
    try {
      const request = await fetch(
        `https://rawg.io/api/games?token&key=${apiKey}&search=${str}&ordering=-metacritic`
      );
      if (request.ok) {
        const response: ApiResponse = await request.json();
        const results: ResponseItem[] = response.results;
        this.setState({ data: results, isLoading: false });
        console.log(response);
      }
    } catch (e) {
      this.setState({ isLoading: false });
      console.log(e);
    }
  };

  render(): ReactNode {
    return (
      <>
        <header className="header">
          <h1>Welcome to API</h1>
          <SearchForm
            keyword={this.state.keyword}
            sendRequest={this.sendRequest}
          />
        </header>
        <main className="main">
          <Content data={this.state.data} loading={this.state.isLoading} />
        </main>
        <footer>2023</footer>
      </>
    );
  }
}
