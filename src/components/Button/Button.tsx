import classes from './Button.module.scss';

export default function SubmitBtn() {
  console.log(classes);
  return (
    <>
      <button type="submit" className={classes.submit_button}>
        Submit
      </button>
    </>
  );
}
