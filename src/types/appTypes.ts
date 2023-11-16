import { ApiResponse, DetailsItem } from './apiTypes';

export type PlatformsSlug = {
  [key: string]: string;
};

export interface ButtonProps {
  buttonText: string;
}

export type InputProps = {
  setLocalKeyword: (keyword: string) => void;
  localKeyword: string;
};

export type AppContextProps = {
  handlePageLimitChange: (selectedLimit: string) => void;
  setKeyword: (newKeyword: string) => void;
  setPageLimit: (limit: string) => void;
  setGamesData: (newData: ApiResponse) => void;
  setSingleGameData: (newDate: DetailsItem) => void;
  singleGameData: DetailsItem;
  gamesData: ApiResponse;
  keyword: string;
  pageLimit: string;
};
