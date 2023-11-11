import classes from './ContentItems.module.scss';
import Pagination from '../Pagination/Pagination';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/Context';
import { makeFetchRequest } from '../../api/apiClient';
import Loader from '../Loader/Loader';
import Fader from '../../layouts/Fallbacks/Fader';
import Item from '../Item/Item';
import NoResults from '../../layouts/NoResults/NoResults';

export default function ContentItems() {
  const { keyword, setData, data } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();
  useEffect(() => {
    const contentLoader = async () => {
      setIsLoading(true);
      try {
        const data = await makeFetchRequest({
          queryStr: keyword,
          pageNumber: page || '1'
        });
        setIsLoading(false);
        setData(data);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    };
    contentLoader();
  }, [keyword, page, setData]);

  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        {isLoading ? (
          <Loader />
        ) : data.count ? (
          data.results.map((item) => <Item key={item.id} {...item} />)
        ) : (
          <NoResults />
        )}
      </div>

      <div className={classes.pagination_container}>
        {isLoading ? <Fader /> : <Pagination />}
        <Outlet />
      </div>
    </section>
  );
}
