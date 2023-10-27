import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';

export default class ContentItem extends Component<{ item: ResponseItem }> {
  render(): ReactNode {
    const { item } = this.props;
    const link = item.metacritic_url;
    return (
      <div className="contents_content-item">
        <div className="content-item_img">
          <img src={item.background_image} alt={`${item.name}_image`} />
        </div>
        <h3 className="content-item_heading">{item.name}</h3>
        <p className="content-item_rate">{item.rating_top}$</p>
        <a className="content-item_link" href={link}>
          Go to steam
        </a>
      </div>
    );
  }
}
