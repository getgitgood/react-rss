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
          <header className="header">
            <button onClick={this.clickHandler}>Restore the App</button>
          </header>
          <main>
            <h1>Something went wrong!</h1>
          </main>
        </>
      );
    }
    return this.props.children;
  }
}
