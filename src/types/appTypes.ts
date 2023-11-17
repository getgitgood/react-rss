import { DetailsItem } from './apiTypes';

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
  setSingleGameData: (newDate: DetailsItem) => void;
  singleGameData: DetailsItem;
};

export type ErrorPageProps = {
  message?: string;
};
