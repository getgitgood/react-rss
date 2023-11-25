import { Component, ReactNode } from 'react';
import ErrorPage from '../layouts/ErrorPage/ErrorPage';
import { ErrorBoundaryState } from '../types';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state = {
    hasError: false,
    error: undefined
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  clickHandler = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
