import { Component, ReactNode } from 'react';
import './index.scss';
import './components/SearchForm/SearchForm';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import ApiClient from './api/apiClient';
import { AppState } from './types';

export default class App extends Component<object, AppState> {
  private apiClient: ApiClient;
  constructor(props: object) {
    super(props);
    this.apiClient = new ApiClient();
    this.state = {
      keyword: localStorage.getItem('keyword') || '',
      data: [],
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount(): void {
    this.sendRequest(this.state.keyword);
  }

  sendRequest = (str: string) => {
    this.setState({ keyword: str, isLoading: true }, async () => {
      try {
        const fetchedData = await this.apiClient.makeFetchRequest(str);
        if (fetchedData) {
          this.setState({ data: fetchedData, isLoading: false });
        }
      } catch (e) {
        this.setState({ isLoading: false });
        console.log(e);
      }
    });
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
