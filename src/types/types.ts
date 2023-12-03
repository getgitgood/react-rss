export type SubmittedFormData = {
  username: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userAgreement: boolean;
  file: string;
  country: string;
};

export interface FieldError {
  message: string | undefined;
}

export type ValidationErrors = {
  [K in
    | 'username'
    | 'age'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'gender'
    | 'userAgreement'
    | 'file'
    | 'country']: FieldError;
};
