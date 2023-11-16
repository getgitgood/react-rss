import { Component, ReactNode } from 'react';
import ErrorPage from '../layouts/ErrorPage/ErrorPage';

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
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
