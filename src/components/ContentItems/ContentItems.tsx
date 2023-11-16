import classes from './ContentItems.module.scss';
import Pagination from '../Pagination/Pagination';
import { Outlet, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/Context';
import { makeFetchRequest } from '../../api/apiClient';
import Loader from '../Loader/Loader';
import PaginationSkeleton from '../../layouts/PaginationSkeleton/PaginationSkeleton';
import Item from '../Item/Item';
import NoResults from '../../layouts/NoResults/NoResults';
import { useAppSelector } from '../../hooks';

export default function ContentItems() {
  const { setGamesData, gamesData } = useContext(AppContext);
  const keyword = useAppSelector((state) => state.searchStr);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();
  useEffect(() => {
    const contentLoader = async () => {
      setIsLoading(true);
      try {
        const gamesList = await makeFetchRequest({
          queryStr: keyword,
          pageNumber: page || '1'
        });
        setGamesData(gamesList);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    contentLoader();
  }, [keyword, page, setGamesData]);

  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        {isLoading ? (
          <Loader />
        ) : gamesData.count ? (
          gamesData.results.map((item) => <Item key={item.id} {...item} />)
        ) : (
          <NoResults />
        )}
      </div>

      <div className={classes.pagination_container}>
        {isLoading ? <PaginationSkeleton /> : <Pagination />}
      </div>
      <Outlet />
    </section>
  );
}
