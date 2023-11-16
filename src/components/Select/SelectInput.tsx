import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { pageSizeUpdated } from '../../features/userPageSize';

export default function SelectInput(formRef: React.RefObject<HTMLFormElement>) {
  const pageSize = useAppSelector((state) => state.pageSize);
  const dispatch = useAppDispatch();
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = e.target.value;
    localStorage.setItem('pageSize', pageSize);
    dispatch(pageSizeUpdated(pageSize));
    formRef.current?.submit();
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
