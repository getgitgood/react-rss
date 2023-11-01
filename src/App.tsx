import { useEffect, useState } from 'react';
import './index.scss';
import './components/SearchForm/SearchForm';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { ResponseItem } from './types';
import makeFetchRequest from './api/apiClient';

export default function App() {
  const initialState: ResponseItem[] = [];
  const [searchStr, setSearchStr] = useState(
    localStorage.getItem('searchStr') || ''
  );
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    sendRequest(searchStr);
  }, [searchStr]);

  const sendRequest = async (str: string) => {
    setSearchStr(str);
    setLoading(true);
    try {
      const fetchedData = await makeFetchRequest(str);
      if (fetchedData) {
        setLoading(false);
        setData(fetchedData);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      <Header searchStr={searchStr} sendRequest={sendRequest}></Header>
      <main className="main">
        <Content items={data} isLoading={isLoading} />
      </main>
    </>
  );
}
