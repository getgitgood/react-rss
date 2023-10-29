import { Component, ReactNode } from 'react';
import './index.scss';
import './components/SearchForm/SearchForm';
import Content from './components/Content/Content';
import { ApiResponse, ResponseItem } from './types';
import Header from './components/Header/Header';

export default class App extends Component {
  state = {
    keyword: localStorage.getItem('keyword') || '',
    data: [],
    isLoading: false,
    isError: false,
  };

  componentDidMount(): void {
    this.fetchData();
  }

  sendRequest = (str: string) => {
    this.setState({ keyword: str }, () => this.fetchData(str));
  };

  fetchData = async (str = '') => {
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
      }
    } catch (e) {
      this.setState({ isLoading: false });
      console.log(e);
    }
  };

  setErrorState = () => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    if (this.state.isError) {
      throw new Error('CRASH DAT APP!');
    }
    return (
      <>
        <Header
          keyword={this.state.keyword}
          requestCb={this.sendRequest}
          setErrorStateCb={this.setErrorState}
        ></Header>
        <main className="main">
          <Content data={this.state.data} loading={this.state.isLoading} />
        </main>
      </>
    );
  }
}
