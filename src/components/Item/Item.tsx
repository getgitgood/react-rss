import { ResponseItem } from '../../types';
import classes from './Item.module.scss';
import { Link } from 'react-router-dom';

export default function Item(props: ResponseItem) {
  return (
    <Link to={`details/${props.id}`} className={classes.item}>
      <div className={classes.item_image_wrapper}>
        <img
          className={classes.item_image}
          src={props.background_image || '/fallback.png'}
          alt={`${props.name}_image`}
        />
      </div>
      <div className={classes.item_title}>
        <h3 className={classes.item_heading}>{props.name}</h3>
        <p className={classes.item_rate}>
          Metacritic:{' '}
          {(props.metacritic && <strong>{props.metacritic} / 100 </strong>) ||
            'Not Rated Yet'}
        </p>
      </div>

      <div className={classes.additional_info}>
        <div className={classes.item_genre_wrapper}>
          {props.genres &&
            props.genres.map((genre) => (
              <div className={classes.item_genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
}
