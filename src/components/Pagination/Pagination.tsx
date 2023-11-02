import { useState } from 'react';
import classes from './Pagination.module.scss';
import { NavData } from '../../types';
import { useParams } from 'react-router-dom';

export default function Pagination(navData: NavData) {
  const [page, setPage] = useState(1);
  const tab = useParams();
  const clickNextHandler = () => {
    console.log(tab);
    setPage(page + 1);
  };

  const clickPrevHandler = () => {
    if (page > 1) {
      console.log(navData.previous);
      setPage(page - 1);
    }
  };

  return (
    <div className={classes.pagination_container}>
      <a className={classes.pagination_button} onClick={clickPrevHandler}>
        &lt;
      </a>
      <a className={classes.pagination_button}>{page}</a>
      <a className={classes.pagination_button} onClick={clickNextHandler}>
        &gt;
      </a>
    </div>
  );
}
