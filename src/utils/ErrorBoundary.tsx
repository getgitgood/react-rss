import { Component, ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = {
    hasError: false
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
