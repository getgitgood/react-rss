import { Component, ReactNode } from 'react';
import { ResponseItem } from '../types';

export default class Item extends Component<{ item: ResponseItem }> {
  render(): ReactNode {
    const { item } = this.props;
    const link = `https://store.steampowered.com/app/${item.gameID}`;
    console.log(link);
    return (
      <div>
        <img src={item.thumb} alt={`${item.internalName} pic`} />
        <h2>{item.internalName}</h2>
        <p>{item.cheapest}$</p>
        <a href={link}>Go to steam</a>
      </div>
    );
  }
}
