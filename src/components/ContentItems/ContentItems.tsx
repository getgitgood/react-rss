import { useAsyncValue } from 'react-router-dom';
import { LoaderResults } from '../../types';
import Item from '../Item/Item';
import NoResults from '../../layouts/NoResults/NoResults';

export function ContentItems() {
  const data = useAsyncValue() as LoaderResults;

  return (
    <>
      {data.response.count ? (
        data.response.results.map((item) => <Item key={item.id} {...item} />)
      ) : (
        <NoResults />
      )}
    </>
  );
}
