import { ChangeEvent } from 'react';

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
