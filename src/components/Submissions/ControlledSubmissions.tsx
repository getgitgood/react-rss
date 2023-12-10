import { useAppSelector } from '../../hooks';
import Submissions from './Submissions';

export default function ControlledSubmissions() {
  const formSubmissions = useAppSelector(
    (state) => state.reactForm.controlledFormSubmissions
  );
  const formInfo = {
    formSubmissions,
    heading: 'Controlled Form Submissions'
  };
  return <Submissions {...formInfo} />;
}
