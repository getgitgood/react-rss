import { DetailsItem, FetchParams } from '../types';
import {
  fetchCardsUrlHelper,
  fetchSingleCardUrlHelper
} from '../utils/helpers';

export async function makeFetchRequest({ queryStr, pageNumber }: FetchParams) {
  const pageSize = localStorage.getItem('pageSize') || '20'; // TODO: replace with store pageSize
  const url = fetchCardsUrlHelper({ queryStr, pageNumber, pageSize });

  try {
    const request = await fetch(url);
    const cardsData = await request.json();

    return cardsData;
  } catch (e) {
    console.error('Error fetching data: ', e);
    throw e;
  }
}

export async function makeDetailsRequest(id: string | undefined) {
  const url = fetchSingleCardUrlHelper(id || '');
  try {
    const request = await fetch(url);
    const singleCardData: DetailsItem = await request.json();

    return singleCardData;
  } catch (e) {
    throw e;
  }
}
