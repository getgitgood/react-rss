import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';
import Loader from '../Loader/Loader';
import ContentItem from '../Item/Item';
import classes from './content.module.scss';

export default class ContentItems extends Component<{
  data: ResponseItem[];
  loading: boolean;
}> {
  render(): ReactNode {
    const { data, loading } = this.props;
    return (
      <div className={classes.contents}>
        {loading ? (
          <Loader />
        ) : (
          data.map((item) => <ContentItem key={item.id} item={item} />)
        )}
      </div>
    );
  }
}
