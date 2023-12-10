import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { FieldProps } from '../TextInput/TextInput';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  labelText: string;
  field?: FieldProps;
  className: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, labelText, field, className, onChange, name, ...rest }, ref) => {
    return (
      <>
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          ref={ref}
          type="checkbox"
          name={name}
          className={className}
          onChange={(e) => {
            if (field?.onChange) field.onChange(e);
            if (onChange) onChange(e);
          }}
          {...rest}
        />
      </>
    );
  }
);

export default CheckboxInput;
