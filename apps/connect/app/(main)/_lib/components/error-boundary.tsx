"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode | ((error: Error, errorInfo: ErrorInfo) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback(this.state.error!, this.state.errorInfo!);
      }
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// This is the wrapper component that can be used in Server Components
export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
}

interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo;
}

export function ErrorFallback({ error, errorInfo }: ErrorFallbackProps) {
  console.error("Caught an error:", error, errorInfo);
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>Error: {error.message}</p>
    </div>
  );
}
