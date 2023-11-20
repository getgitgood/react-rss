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

export type ErrorPageProps = {
  message?: string;
};
