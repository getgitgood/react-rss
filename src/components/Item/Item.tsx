import { ResponseItem } from '../../types';
import classes from './Item.module.scss';
import platformsSlugData from '../../utils/platformsSlugData';

export default function Item(props: ResponseItem) {
  const changeClassName = (slug: string) => {
    const platformsSlug = platformsSlugData;
    const currentClassName = platformsSlug[slug];
    return `${classes.platform_logo} ${currentClassName}`;
  };

  return (
    <div className={classes.item}>
      <div className={classes.item_image_wrapper}>
        <img
          className={classes.item_image}
          src={props.background_image || '/fallback.png'}
          alt={`${props.name}_image`}
        />
      </div>
      <div className={classes.item_title}>
        <h3 className={classes.item_heading}>{props.name}</h3>
        {props.metacritic && (
          <p className={classes.item_rate}>
            Metacritic: <strong>{props.metacritic} / 100 </strong>
          </p>
        )}
      </div>

      <div className={classes.additional_info}>
        <div className={classes.item_genre_wrapper}>
          {props.genres.map((genre) => (
            <div className={classes.item_genre} key={genre.id}>
              {genre.name}
            </div>
          ))}
        </div>
        <div className={classes.item_platforms_wrapper}>
          {props.platforms.map((platform) => {
            const currentClassName = changeClassName(platform.platform.slug);
            return (
              <div
                className={currentClassName}
                data-platform={platform.platform.name}
                key={platform.platform.id}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
