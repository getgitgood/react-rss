import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';
import ContentItem from '../Item/Item';
import classes from './content.module.scss';

export default class ContentItems extends Component<{ data: ResponseItem[] }> {
  componentDidMount = () => {
    console.log('mount');
  };

  render(): ReactNode {
    console.log(classes);
    return (
      <div className={classes}>
        {this.props.data.map((item) => (
          <ContentItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
