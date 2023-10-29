import { Component, ReactNode } from 'react';
import { PlatformsSlug, ResponseItem } from '../../types';
import classes from './Item.module.scss';

export default class Item extends Component<{ item: ResponseItem }> {
  changeClassName = (slug: string) => {
    const platformsSlug: PlatformsSlug = {
      playstation5: classes.ps5,
      playstation4: classes.ps4,
      playstation3: classes.ps3,
      playstation2: classes.ps2,
      playstation: classes.ps1,
      psp: classes.psp,
      'ps-vita': classes.vita,
      'xbox-old': classes.xbox_old,
      'xbox-one': classes.xbox_one,
      'xbox-series-x': classes.xbox_x,
      xbox360: classes.xbox_360,
      ios: classes.ios,
      android: classes.android,
      wii: classes.wii,
      'nintendo-switch': classes.switch,
      macos: classes.macos,
      pc: classes.pc,
    };
    const currentClassName =
      `${classes.platform_logo} ` +
      (platformsSlug[slug] || 'platform_template');
    return currentClassName;
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
