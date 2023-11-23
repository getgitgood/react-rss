import { wrapper } from '../../store';
import { apiSlice } from '../../features/api/apiSlice';
import { ApiResponse } from '../../types';
import CardsList from '../../components/CardsList/CardsList';

export default function Page({ gameData }: { gameData: ApiResponse }) {
  return <CardsList gameData={gameData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let search = context?.query.search;
    const { page, isEmpty, page_size } = context?.query;
    console.log(context?.query);
    if (isEmpty === 'true' || (!isEmpty && search === 'all')) {
      search = '';
    }
    const { data: gameData } = await store.dispatch(
      apiSlice.endpoints.getGames.initiate({
        searchStr: search as string,
        pageSize: (page_size as string) || '20',
        page: page as string
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
