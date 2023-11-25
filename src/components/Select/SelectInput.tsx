import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updatePageSize } from '../../features/userInputs/userInputsSlice';

export default function SelectInput() {
  const { pageSize } = useAppSelector((state) => state.userInputs);
  const dispatch = useAppDispatch();
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = e.target.value;
    dispatch(updatePageSize(pageSize));
  };

  return (
    <select
      onChange={changeHandler}
      name="pageSize"
      aria-label="items per page"
      value={pageSize}
      data-testid={'count'}
    >
      <option value={'10'}>10</option>
      <option value={'20'}>20</option>
      <option value={'30'}>30</option>
      <option value={'40'}>40</option>
    </select>
  );
}
