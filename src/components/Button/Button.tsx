import { Component } from 'react';
import classes from './Button.module.scss';

export default class SubmitBtn extends Component {
  render() {
    return (
      <>
        <button type="submit" className={classes.submit_button}>
          Submit
        </button>
      </>
    );
  }
}
