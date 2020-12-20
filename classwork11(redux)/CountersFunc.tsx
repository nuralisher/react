import React, { Component, ReactNode, useState } from "react";

interface Props {
  count: number;
  incrementCount: () => void;
}
interface State {
  count: number;
}

export function CounterClickF({ count, incrementCount }: Props) {
  return (
    <div>
      <button onClick={incrementCount}>Clicked {count} times</button>
    </div>
  );
}

export function CounterHoverF({ count, incrementCount }: Props) {
  return (
    <div onMouseOver={incrementCount}>
      <span>Hovered {count} times</span>
    </div>
  );
}

interface CounterProps {
  render: (count: number, incrementCount: () => void) => ReactNode;
}

export default function CounterF({ render }: CounterProps) {
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return <div>{render(count, incrementCount)}</div>;
}
