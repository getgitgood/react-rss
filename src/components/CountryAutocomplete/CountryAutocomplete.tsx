import { ChangeEvent, Ref, forwardRef, useState } from 'react';
import { useAppSelector } from '../../hooks';

export type CountryAutocomplete = {
  value: string;
  onChange?: (value: string) => void;
};

const CountryAutocomplete = forwardRef(
  (
    { value = '', onChange }: CountryAutocomplete,
    ref: Ref<HTMLInputElement>
  ) => {
    const { countries } = useAppSelector((state) => state.countries);
    const [inputValue, setValue] = useState(value);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
        return;
      }
      setValue(e.target.value);
    };

    const filteredCountries = countries.filter((country) =>
      country.toLocaleLowerCase().includes(value)
    );

    return (
      <div>
        <input
          type="text"
          onChange={handleInputChange}
          value={onChange ? value : inputValue}
          list="countries"
          id="country"
          name="country"
          ref={ref}
        />
        <datalist id="countries">
          {filteredCountries.map((value, i) => (
            <option key={i} value={value} />
          ))}
        </datalist>
      </div>
    );
  }
);

export default CountryAutocomplete;
