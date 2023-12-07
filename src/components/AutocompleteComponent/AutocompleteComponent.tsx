import { ChangeEvent, Ref, forwardRef, useState } from 'react';
import { useAppSelector } from '../../hooks';

export type CountryAutocomplete = {
  value: string;
  labelText?: string;
  id: string;
  onChange?: (value: string) => void;
  checkAllFieldsFilled?: () => void;
  placeholder?: string;
};

const CountryAutocomplete = forwardRef(
  (
    {
      value = '',
      onChange,
      checkAllFieldsFilled,
      labelText,
      id,
      placeholder
    }: CountryAutocomplete,
    ref: Ref<HTMLInputElement>
  ) => {
    const { countries } = useAppSelector((state) => state.countries);
    const [inputValue, setValue] = useState(value);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (onChange) {
        onChange(value);
        return;
      }
      if (checkAllFieldsFilled) {
        checkAllFieldsFilled();
      }
      setValue(value);
    };

    const filteredCountries = countries.filter((country) =>
      country.toLocaleLowerCase().includes(value)
    );

    return (
      <>
        <label htmlFor={id}>{labelText}</label>
        <input
          placeholder={placeholder}
          name={id}
          onChange={handleInputChange}
          value={onChange ? value : inputValue}
          list="countries"
          id={id}
          ref={ref}
        />
        <datalist id="countries">
          {filteredCountries.map((value, i) => (
            <option key={i} value={value} />
          ))}
        </datalist>
      </>
    );
  }
);

export default CountryAutocomplete;
