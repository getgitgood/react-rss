import React from 'react';

import classes from '../../components/CardsList/CardsList.module.scss';
import { ApiResponse, DetailedCardResponse } from '../../types';
import CardsList from '../../components/CardsList/CardsList';
import Details from '../../components/Details/Details';
import { wrapper } from '../../store';
import fetchServerSideProps from '../_utils/fetchServerSideProps';

export default function Games({
  gameData,
  detailsData
}: {
  gameData: ApiResponse;
  detailsData?: DetailedCardResponse;
}) {
  return (
    <section className={classes.content}>
      <CardsList gameData={gameData} />
      {detailsData && <Details detailsData={detailsData} />}
    </section>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const data = await fetchServerSideProps(store, context);
    const { gameData, detailsData } = data.props;
    return {
      props: {
        gameData,
        detailsData
      }
    };
  }
);
