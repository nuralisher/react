import React, { Component, ErrorInfo } from "react";

interface Props {}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      return "The Society Was Wrong";
    }

    return this.props.children;
  }

  public static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error: ", error);
    console.log("Stack Trace: ", errorInfo);
  }
}
