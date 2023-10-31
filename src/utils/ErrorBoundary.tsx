import { Component } from 'react';
import { ErrorProps, ErrorState } from '../types';

export default class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  clickHandler = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <header>
            <h1>Something went wrong!</h1>
          </header>
          <main className="error_occured">
            <button onClick={this.clickHandler}>Restore the App</button>
          </main>
        </>
      );
    }
    return this.props.children;
  }
}
