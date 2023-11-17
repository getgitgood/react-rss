import { DetailsItem } from '../types';
import { fetchSingleCardUrlHelper } from '../utils/helpers';

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
