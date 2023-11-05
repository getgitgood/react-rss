import {
  Await,
  LoaderFunctionArgs,
  defer,
  useLoaderData
} from 'react-router-dom';
import { makeDetailsRequest } from '../../api/apiClient';
import classes from './Details.module.scss';
import { DeferData } from '../../types';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const cardId = params.cardId;
  return defer({
    data: makeDetailsRequest(cardId)
  });
}

export function Details() {
  const deferData = useLoaderData() as DeferData;
  const data = deferData.data;
  return (
    <div className={classes.container}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data}>
          {(resolvedData) => <div>{resolvedData.description}</div>}
        </Await>
      </Suspense>
    </div>
  );
}
