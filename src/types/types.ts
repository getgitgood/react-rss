export type SubmittedFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userAgreement: boolean;
  file: string;
  country: string;
  isNew: boolean;
};

export interface FieldError {
  message: string | undefined;
}

export type ValidationErrors = {
  [K in
    | 'name'
    | 'age'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'gender'
    | 'userAgreement'
    | 'file'
    | 'country']: FieldError;
};
