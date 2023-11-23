import React from 'react';
import CardsList from '../components/CardsList/CardsList';
import { apiSlice } from '../features/api/apiSlice';
import { wrapper } from '../store';
import { ApiResponse } from '../types';

export default function Index({ gameData }: { gameData: ApiResponse }) {
  return <CardsList gameData={gameData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { data: gameData } = await store.dispatch(
      apiSlice.endpoints.getGames.initiate({
        searchStr: '',
        pageSize: '20',
        page: '1'
      })
    );
    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {
        gameData
      }
    };
  }
);
