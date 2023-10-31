import { Component, ReactNode } from 'react';
import { ResponseItem } from '../../types';
import Loader from '../Loader/Loader';
import Item from '../Item/Item';
import classes from './content.module.scss';

export default class Content extends Component<{
  data: ResponseItem[];
  loading: boolean;
}> {
  render(): ReactNode {
    const { data, loading } = this.props;
    return (
      <section className={classes.content}>
        {loading ? (
          <Loader />
        ) : (
          data.map((item) => <Item key={item.id} item={item} />)
        )}
      </section>
    );
  }
}
