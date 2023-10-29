import { Component, ReactNode } from 'react';
import { InputProps } from '../../types';

export default class Input extends Component<InputProps> {
  render(): ReactNode {
    return (
      <input
        placeholder="Search"
        value={this.props.value}
        onChange={this.props.onChange}
      ></input>
    );
  }
}
