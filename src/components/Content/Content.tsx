import { LoaderResults, NavData } from '../../types';
import Item from '../Item/Item';
import classes from './content.module.scss';
import Pagination from '../Pagination/Pagination';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { makeFetchRequest } from '../../api/apiClient';

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  const gameId = localStorage.getItem('searchStr');
  const data: LoaderResults = await makeFetchRequest({
    queryStr: gameId ?? '',
    pageNumber: id
  });
  return data;
}

export function Content() {
  const data = useLoaderData() as LoaderResults;
  console.log(data);
  const items = data.response.results;
  const navData: NavData = {
    current: data.pageNumber,
    count: data.response.count,
    next: data.response.next,
    previous: data.response.previous,
    name: data.queryStr
  };
  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
      {<Pagination {...navData} />}
    </section>
  );
}
