import { ChangeEvent } from 'react';
import { ResponseItem } from './apiTypes';

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

export interface SearchFormProps {
  searchStr: string;
  sendRequest: (str: string) => void;
}

export interface ContentProps {
  items: ResponseItem[];
  isLoading: boolean;
}
