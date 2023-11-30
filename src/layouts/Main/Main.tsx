import classes from './Main.module.scss';
import UncontrolFormInfo from '../../components/UncontrolFormInfo/UncontrolFormInfo';
import ReactFormInfo from '../../components/ReactFormInfo/ReactFormInfo';

export default function Main() {
  return (
    <div className={classes.form_info_wrapper}>
      <UncontrolFormInfo />
      <ReactFormInfo />
    </div>
  );
}
