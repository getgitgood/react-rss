import React from 'react';
import { LayoutProps } from '../../types';
import { wrapper } from '../../store';
import fetchServerSideProps from '../../utils/fetchServerSideProps';
import Layout from '../../layouts/PagesLayout/_Layout';

export default function SearchPage({ cardListData, detailsData }: LayoutProps) {
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
