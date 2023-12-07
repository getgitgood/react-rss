import { useAppSelector } from '../../hooks';
import Submissions from './Submissions';

export default function UncontrolledSubmissions() {
  const formSubmissions = useAppSelector(
    (state) => state.reactForm.uncontrolledFormSubmissions
  );
  const formInfo = {
    formSubmissions,
    heading: 'Uncontrolled Form Submissions'
  };
  return <Submissions {...formInfo} />;
}
