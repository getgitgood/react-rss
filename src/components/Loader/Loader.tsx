import { Component } from 'react';
import classes from './Loader.module.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={classes.loader_wrapper}>
        <div className={classes.loader}></div>
      </div>
    );
  }
}
