import classes from './CardsList.module.scss';
import Card from '../Card/Card';
import NoResults from '../../layouts/NoResults/NoResults';
import { ApiResponse } from '../../types';
import Pagination from '../Pagination/Pagination';

export type CustomError = {
  message: string;
  stack: string;
};

export default function CardsList({ gameData }: { gameData: ApiResponse }) {
  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        {gameData.count ? (
          gameData.results.map((item) => <Card key={item.id} {...item} />)
        ) : (
          <NoResults />
        )}
      </div>

      <div className={classes.pagination_container}>
        <Pagination gameData={gameData} />
      </div>
    </section>
  );
}
