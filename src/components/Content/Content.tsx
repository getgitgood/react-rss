import { ContentProps } from '../../types';
import Loader from '../Loader/Loader';
import Item from '../Item/Item';
import classes from './content.module.scss';

export default function Content({ items, isLoading }: ContentProps) {
  return (
    <section className={classes.content}>
      {isLoading ? (
        <Loader />
      ) : (
        items.map((item) => <Item key={item.id} {...item} />)
      )}
    </section>
  );
}
