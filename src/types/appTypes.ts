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
  error: Error;
  message?: string;
};

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
