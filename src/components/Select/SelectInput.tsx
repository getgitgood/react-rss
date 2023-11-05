import { ChangeEvent } from 'react';
import { SelectProps } from '../../types';

export default function SelectInput({ onChange, value }: SelectProps) {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={changeHandler} name="limit" value={value}>
      <option value={'10'}>10</option>
      <option value={'20'}>20</option>
      <option value={'30'}>30</option>
      <option value={'40'}>40</option>
    </select>
  );
}
