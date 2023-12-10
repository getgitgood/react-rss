import { ChangeEvent, Ref, forwardRef } from 'react';

export type PasswordInputProps = {
  id: string;
  placeholder: string;
  labelText: string;
  type: string;
  value?: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  field?: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
  };
};
const PasswordInput = forwardRef(
  (
    { id, placeholder, labelText, type, field, handler }: PasswordInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <>
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type || 'text'}
          placeholder={placeholder ? placeholder : ''}
          id={id}
          name={id}
          ref={ref}
          {...field}
          onChange={(e) => {
            if (field?.onChange) {
              field.onChange(e);
            }
            handler(e);
          }}
          onBlur={(e) => {
            if (field?.onBlur) {
              field.onChange(e);
            }
            handler(e);
          }}
        />
      </>
    );
  }
);

export default PasswordInput;
