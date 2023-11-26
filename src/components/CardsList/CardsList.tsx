import classes from './CardsList.module.scss';
import Card from '../Card/Card';
import NoResults from '../../layouts/NoResults/NoResults';
import { ApiResponse } from '../../types';
import Pagination from '../Pagination/Pagination';

export default function CardsList({
  cardListData
}: {
  cardListData: ApiResponse;
}) {
  return (
    <>
      <div className={classes.content_items}>
        {cardListData.count ? (
          cardListData.results.map((item) => <Card key={item.id} {...item} />)
        ) : (
          <NoResults />
        )}
      </div>

      <div className={classes.pagination_container}>
        <Pagination cardListData={cardListData} />
      </div>
    </>
  );
}
