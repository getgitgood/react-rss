import React from 'react';
import { wrapper } from '../store';
import { LayoutProps } from '../types';
import fetchServerSideProps from '../utils/fetchServerSideProps';
import Layout from '../layouts/PagesLayout/_Layout';

export default function IndexPage({ cardListData, detailsData }: LayoutProps) {
  return <Layout cardListData={cardListData} detailsData={detailsData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const data = await fetchServerSideProps(store, context);
    const { cardListData, detailsData } = data.props;
    return {
      props: {
        cardListData,
        detailsData
      }
    };
  }
);
