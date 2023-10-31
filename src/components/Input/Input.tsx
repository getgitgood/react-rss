import { Component, ReactNode } from 'react';
import { InputProps } from '../../types';
import classes from './Input.module.scss';

export default class Input extends Component<InputProps> {
  render(): ReactNode {
    return (
      <input
        className={classes.input}
        placeholder="Search"
        value={this.props.value}
        onChange={this.props.onChange}
      ></input>
    );
  }
}
