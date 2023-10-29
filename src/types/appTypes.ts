import { ChangeEvent, ReactNode } from 'react';
import { ResponseItem } from './apiTypes';

export type SearchFormState = {
  keyword: string;
};

export type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type State = {
  keyword: string;
  data: [] | ResponseItem[];
};

export type PlatformsSlug = {
  [key: string]: string;
};

export interface ErrorState {
  hasError: boolean;
}

export interface ErrorProps {
  children: ReactNode;
}
