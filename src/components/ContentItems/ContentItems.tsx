// import { useAsyncValue } from 'react-router-dom';
import Item from '../Item/Item';
import NoResults from '../../layouts/NoResults/NoResults';
// import { DeferredData } from '@remix-run/router/dist/utils';
import { useContext } from 'react';
import { AppContext } from '../Context/Context';

export function ContentItems() {
  const { data } = useContext(AppContext);
  return (
    <>
      {data.count ? (
        data.results.map((item) => <Item key={item.id} {...item} />)
      ) : (
        <NoResults />
      )}
    </>
  );
}
