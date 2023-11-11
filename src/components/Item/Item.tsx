import { ResponseItem } from '../../types';
import classes from './Item.module.scss';
import { Link } from 'react-router-dom';

export default function Item(props: ResponseItem) {
  const { id, name, metacritic, genres, background_image } = props;

  return (
    <Link to={`&item=${id}`} className={classes.item} data-testid="cardItem">
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
