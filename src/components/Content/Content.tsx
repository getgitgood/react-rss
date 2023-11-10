import classes from './content.module.scss';
import Pagination from '../Pagination/Pagination';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ContentItems } from '../ContentItems/ContentItems';
import { AppContext } from '../Context/Context';
import { makeFetchRequest } from '../../api/apiClient';
import Loader from '../Loader/Loader';
import Fader from '../../layouts/Fallbacks/Fader';

export default function Content() {
  const { keyword, setData } = useContext(AppContext);
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
        {isLoading ? <Loader /> : <ContentItems />}
      </div>

      <div className={classes.pagination_container}>
        {isLoading ? <Fader /> : <Pagination />}
        <Outlet />
      </div>
    </section>
  );
}
