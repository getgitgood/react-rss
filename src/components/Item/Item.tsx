import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';
import classes from './Item.module.scss';
import platformsSlugData from '../../utils/platformsSlugData';

export default class Item extends Component<{ item: ResponseItem }> {
  changeClassName = (slug: string) => {
    const platformsSlug = platformsSlugData;
    const currentClassName = platformsSlug[slug] || 'platform_template';
    return `${classes.platform_logo} ${currentClassName}`;
  };

  render(): ReactNode {
    const { item } = this.props;
    return (
      <div className={classes.item}>
        <div className={classes.item_image_wrapper}>
          <img
            className={classes.item_image}
            src={item.background_image || '/fallback.png'}
            alt={`${item.name}_image`}
          />
        </div>
        <div className={classes.item_title}>
          <h3 className={classes.item_heading}>{item.name}</h3>
          {item.metacritic ? (
            <p className={classes.item_rate}>Metacritic {item.metacritic}</p>
          ) : (
            ''
          )}
        </div>
        <div className={classes.additional_info}>
          <div className={classes.item_genre_wrapper}>
            {item.genres.map((genre) => (
              <div className={classes.item_genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          <div className={classes.item_platforms_wrapper}>
            {item.platforms.map((platform) => {
              const currentClassName = this.changeClassName(
                platform.platform.slug
              );
              return (
                <div
                  className={currentClassName}
                  data-platform={platform.platform.name}
                  key={crypto.randomUUID()}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
