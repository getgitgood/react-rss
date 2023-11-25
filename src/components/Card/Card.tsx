import { useRouter } from 'next/router';
import { SingleCardResponse } from '../../types';
import classes from './Card.module.scss';
import Link from 'next/link';

export default function Card(props: SingleCardResponse) {
  const { id, name, metacritic, genres, background_image } = props;

  const router = useRouter();

  const { search, page, page_size } = router.query;
  return (
    <Link
      href={{
        pathname: `/`,
        query: {
          id: id,
          search: search,
          page: page,
          page_size: page_size || '20'
        }
      }}
      scroll={false}
      as={`/games/${search || 'all'}?id=${id}`}
      className={classes.item}
      data-testid="card"
    >
      <div className={classes.item_image_wrapper}>
        <img
          className={classes.item_image}
          src={background_image || '/fallback.png'}
          alt={`${name}_image`}
        />
      </div>
      <div className={classes.item_title}>
        <h3 className={classes.item_heading}>{name}</h3>
        <p className={classes.item_rate}>
          <span className={classes.item_rate_title}>Metacritic:</span>{' '}
          {(metacritic && (
            <span className={classes.item_rating}>{metacritic} / 100 </span>
          )) ||
            'Not Rated Yet'}
        </p>
      </div>

      <div className={classes.additional_info}>
        <div className={classes.item_genre_wrapper}>
          {genres && genres.length ? (
            genres.map((genre) => (
              <div className={classes.item_genre} key={genre.id}>
                {genre.name}
              </div>
            ))
          ) : (
            <div className={classes.item_genre}>N/A</div>
          )}
        </div>
      </div>
    </Link>
  );
}
