import CardsList from '../../components/CardsList/CardsList';
import Details from '../../components/Details/Details';
import classes from '../../components/CardsList/CardsList.module.scss';
import { LayoutProps } from '../../types';

const Layout = ({ cardListData, detailsData }: LayoutProps) => {
  return (
    <section className={classes.content}>
      <CardsList cardListData={cardListData} />
      {detailsData && <Details detailsData={detailsData} />}
    </section>
  );
};

export default Layout;
