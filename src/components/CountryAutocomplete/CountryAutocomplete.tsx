import { ChangeEvent, Ref, forwardRef } from 'react';
import { useAppSelector } from '../../hooks';

export type CountryAutocomplete = {
  value: string;
  onChange: (value: string) => void;
};

const CountryAutocomplete = forwardRef(
  (
    { value = '', onChange }: CountryAutocomplete,
    ref: Ref<HTMLInputElement>
  ) => {
    const { countries } = useAppSelector((state) => state);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const filteredCountries = countries.filter((country) =>
      country.toLocaleLowerCase().includes(value)
    );

    return (
      <div>
        <input
          type="text"
          onChange={handleInputChange}
          value={value}
          list="countries"
          id="country"
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
