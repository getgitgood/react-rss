import { ApiResponse, NavData } from '../../types';
import Item from '../Item/Item';
import classes from './content.module.scss';
import Pagination from '../Pagination/Pagination';
import { useLoaderData } from 'react-router-dom';
import { makeInitialRequest } from '../../api/apiClient';

export async function loader() {
  const data = await makeInitialRequest();
  return data;
}

export function Content() {
  const data = useLoaderData() as ApiResponse;
  const items = data.results;
  const navData: NavData = { ...data };
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
