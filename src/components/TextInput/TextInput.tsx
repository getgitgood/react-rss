import {
  Control,
  ControllerFieldState,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
  UseFormStateReturn
} from 'react-hook-form';
import { ChangeEvent, Ref, forwardRef } from 'react';

export type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  control?: Control<TFieldValues>;
};

export type ControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  formState: UseFormStateReturn<TFieldValues>;
  fieldState: ControllerFieldState;
};
export interface YupValidation extends FieldValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userAgreement: NonNullable<boolean | undefined>;
  file: File;
  country: string;
}

export type FieldProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | boolean | number;
};

export interface TextInputProps {
  id?: string;
  placeholder?: string;
  labelText?: string;
  type?: string;
  value?: string;
  handler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  field?: FieldProps;
  name?: string;
  className?: string;
}

const TextInput = forwardRef(
  (
    {
      id,
      placeholder,
      labelText,
      type,
      field,
      value,
      className,
      onChange,
      name
    }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <>
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type || 'text'}
          placeholder={placeholder ? placeholder : ''}
          id={id}
          ref={ref}
          {...field}
          onChange={(e) => {
            if (field?.onChange) {
              field.onChange(e);
            }
            if (onChange) {
              console.log('fff');
              onChange(e);
            }
          }}
          name={name}
          value={value}
          className={className}
        />
      </>
    );
  }
);

export default TextInput;
