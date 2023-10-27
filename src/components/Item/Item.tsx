import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';
import classes from './Item.module.scss';

export default class ContentItem extends Component<{ item: ResponseItem }> {
  render(): ReactNode {
    const { item } = this.props;
    const link = item.metacritic_url;
    return (
      <div className={classes.item}>
        <div className={classes.item_image_wrapper}>
          <img
            className={classes.item_image}
            src={item.background_image}
            alt={`${item.name}_image`}
          />
        </div>
        <div className={classes.text_content}>
          <h3 className={classes.heading}>{item.name}</h3>
          <p className="content-item_rate">{item.rating_top}$</p>
          <a className="content-item_link" href={link}>
            Go to steam
          </a>
        </div>
      </div>
    );
  }
}
