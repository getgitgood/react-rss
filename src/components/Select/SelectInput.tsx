import { ChangeEvent, useContext } from 'react';
import { AppContext } from '../Context/Context';

export default function SelectInput(formRef: React.RefObject<HTMLFormElement>) {
  const { handlePageLimitChange, pageLimit } = useContext(AppContext);
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    handlePageLimitChange(e.target.value);
    formRef.current?.submit();
  };

  return (
    <select
      onChange={changeHandler}
      name="limit"
      aria-label="items per page"
      value={pageLimit}
      data-testid={'count'}
    >
      <option value={'10'}>10</option>
      <option value={'20'}>20</option>
      <option value={'30'}>30</option>
      <option value={'40'}>40</option>
    </select>
  );
}
