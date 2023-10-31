import classes from './Error.module.scss';
import Button from '../Button/Button';

export default class ErrorButton extends Button {
  clickHandler = () => {
    this.props.onClick!();
  };

  render() {
    return (
      <>
        <button
          type="submit"
          className={classes.error_button}
          onClick={this.clickHandler}
        >
          {this.props.text}
        </button>
      </>
    );
  }
}
