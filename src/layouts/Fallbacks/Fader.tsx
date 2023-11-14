import classes from './Fader.module.scss';

export default function Fader() {
  return (
    <div className={classes.fadeout}>
      <div className={classes.items}></div>
      <div className={classes.items}></div>
      <div className={classes.items}></div>
    </div>
  );
}
