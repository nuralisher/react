import React, { Component, ReactNode } from "react";

interface Props {
  incrementCount: () => void;
  count: number;
}
interface State {
  count: number;
}

export class CounterClick extends Component<Props, State> {
  state = { count: 0 };

  render() {
    const { count, incrementCount } = this.props;
    return (
      <div>
        <button onClick={incrementCount}>Clicked {count}</button>
      </div>
    );
  }
}

export class CounterHover extends Component<Props, State> {
  state = { count: 0 };

  render() {
    const { count, incrementCount } = this.props;
    return (
      <div onMouseOver={incrementCount}>
        <span>Hovered {count}</span>
      </div>
    );
  }
}

interface CounterProps {
  render: (count: number, incrementCount: () => void) => ReactNode;
}

export class Counter extends Component<CounterProps, State> {
  state = { count: 0 };

  incrementCount = () => {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  };

  render() {
    return (
      <div>{this.props.render(this.state.count, this.incrementCount)}</div>
    );
  }
}
