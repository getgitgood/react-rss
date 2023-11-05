import { useAsyncValue } from 'react-router-dom';
import { LoaderResults } from '../../types';
import Item from '../Item/Item';

export function ContentItems() {
  const data = useAsyncValue() as LoaderResults;
  return (
    <>
      {data.response.results.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
}
