import {
  initialResponse,
  initialSingleCardData
} from '../../utils/initialStates';

export const preloadedCardsState = {
  singleCard: initialSingleCardData,
  cardsList: initialResponse,
  cardsListLoading: false,
  singleCardLoading: false,
  id: '',
  detailsLoading: false
};

export default function setUserInputState(searchStr: string, pageSize: string) {
  return {
    userInputs: {
      searchStr: searchStr,
      pageSize: pageSize
    }
  };
}
