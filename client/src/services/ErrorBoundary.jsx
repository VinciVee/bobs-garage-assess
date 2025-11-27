// src/components/ErrorBoundary.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <Link to="/">
            <button onClick={this.resetError} style={{ marginTop: "1rem" }}>
              Try Again
            </button>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
