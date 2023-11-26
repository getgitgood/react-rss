import { GetServerSidePropsContext, PreviewData } from 'next/types';
import { AppStore } from '../store';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { apiSlice } from '../features/api/apiSlice';

export default async function fetchServerSideProps(
  store: AppStore,
  context: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>
) {
  let search = context?.query.search;
  const { page, isEmpty, page_size, id } = context?.query;
  if (isEmpty === 'true' || (!isEmpty && search === 'all')) {
    search = '';
  }
  const { data: cardListData } = await store.dispatch(
    apiSlice.endpoints.getGames.initiate({
      searchStr: (search as string) || '',
      pageSize: (page_size as string) || '20',
      page: (page as string) || '1'
    })
  );

  let detailsData = null;

  if (id) {
    const detailsDataResponse = await store.dispatch(
      apiSlice.endpoints.getGameById.initiate({ id: id as string })
    );
    detailsData = detailsDataResponse.data;
    if (detailsData === undefined) {
      detailsData = {};
    }
  }

  await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
  return {
    props: {
      cardListData,
      detailsData
    }
  };
}
