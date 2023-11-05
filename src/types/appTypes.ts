import { ChangeEvent } from 'react';
import { NavData, ResponseItem } from './apiTypes';

export type InputProps = {
  searchStr: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type PlatformsSlug = {
  [key: string]: string;
};

export interface ButtonProps {
  buttonText: string;
  callback?: () => void;
}

export type SelectProps = {
  onChange: (str: string) => void;
  value: string;
};

export interface SearchFormProps {
  searchStr: string;
  updateSearchStr: (str: string) => void;
  sendRequest: (str: string) => void;
}

export type SearchFormCb = Pick<SearchFormProps, 'sendRequest'>;

export interface ContentProps {
  items: ResponseItem[];
  isLoading: boolean;
  navData: NavData;
}

export type FormRequest = {
  request: URL;
};

export type RevalidateProps = {
  currentUrl: URL;
  nextUrl: URL;
};
