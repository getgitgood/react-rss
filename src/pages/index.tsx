import React from 'react';
import CardsList from '../components/CardsList/CardsList';
import classes from '../components/CardsList/CardsList.module.scss';
import { wrapper } from '../store';
import { ApiResponse, DetailedCardResponse } from '../types';
import Details from '../components/Details/Details';
import fetchServerSideProps from './_utils/fetchServerSideProps';

export default function Index({
  gameData,
  detailsData
}: {
  gameData: ApiResponse;
  detailsData?: DetailedCardResponse;
}) {
  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        <CardsList gameData={gameData} />
      </div>
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
