import classes from './Main.module.scss';
import UncontrolFormInfo from '../../components/Submissions/UncontrolledSubmissions';
import ReactFormInfo from '../../components/Submissions/ControlledSubmissions';

export default function Main() {
  return (
    <div className={classes.form_info_wrapper}>
      <UncontrolFormInfo />
      <ReactFormInfo />
    </div>
  );
}
