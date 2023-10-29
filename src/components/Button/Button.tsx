import { Component } from 'react';
import classes from './Button.module.scss';

export default class Button extends Component<{
  text: string;
  onClick?: () => void;
}> {
  render() {
    return (
      <>
        <button type="submit" className={classes.submit_button}>
          {this.props.text}
        </button>
      </>
    );
  }
}
