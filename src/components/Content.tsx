import { Component, ReactNode } from 'react';
import { ResponseItem } from '../types';
import Item from './Item';

export default class Content extends Component<{ data: ResponseItem[] }> {
  componentDidMount = () => {
    console.log('mount');
  };

  componentWillUnmount(): void {
    console.log('unmount');
  }

  render(): ReactNode {
    console.log(this.props.data);
    return (
      <div>
        {this.props.data.map((item) => (
          <Item key={item.gameID} item={item} />
        ))}
      </div>
    );
  }
}
