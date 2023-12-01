import classes from './Main.module.scss';
import UncontrolFormInfo from '../../components/Forms/UncontrolFormInfo';
import ReactFormInfo from '../../components/Forms/ReactFormInfo';

export default function Main() {
  return (
    <div className={classes.form_info_wrapper}>
      <UncontrolFormInfo />
      <ReactFormInfo />
    </div>
  );
}
