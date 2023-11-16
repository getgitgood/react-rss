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
  handleLimitChange: (selectedLimit: string) => void;
  setKeyword: (newKeyword: string) => void;
  setLimit: (limit: string) => void;
  setData: (newData: ApiResponse) => void;
  setItemData: (newDate: DetailsItem) => void;
  itemData: DetailsItem;
  data: ApiResponse;
  keyword: string;
  limit: string;
};
