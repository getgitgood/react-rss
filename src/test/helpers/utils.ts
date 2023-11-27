import { GetServerSidePropsContext, PreviewData } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getServerSideProps } from '../../pages';
import { ApiResponse, DetailedCardResponse } from '../../types';

type MockedContextProps = [search: string, page_size?: string, id?: string];

export default async function mockSSPWithContext(query: MockedContextProps) {
  const context = {
    query: {
      search: query[0]
    } as NextParsedUrlQuery
  } as GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>;
  if (query[1]) {
    Object.defineProperty(context.query, 'page_size', { value: query[1] });
  }
  if (query[2]) {
    Object.defineProperty(context.query, 'id', { value: query[2] });
  }
  const { props } = (await getServerSideProps(context)) as {
    props: {
      cardListData: ApiResponse;
      detailsData?: DetailedCardResponse;
    };
  };

  return props;
}
