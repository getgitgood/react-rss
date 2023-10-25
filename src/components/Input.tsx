import { ChangeEvent, Component, ReactNode } from 'react';

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default class Input extends Component<InputProps> {
  render(): ReactNode {
    return (
      <input
        placeholder="Type your request"
        value={this.props.value}
        onChange={this.props.onChange}
      ></input>
    );
  }
}
