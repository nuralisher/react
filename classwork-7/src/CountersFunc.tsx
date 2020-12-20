import React, { Component, ReactNode, useState } from "react";

interface Props {
  incrementCount: () => void;
  count: number;
}
interface State {
  count: number;
}

export function CounterClickF({ count, incrementCount }: Props) {
  return (
    <div>
      <button onClick={incrementCount}>Clicked {count}</button>
    </div>
  );
}

export function CounterHoverF({ count, incrementCount }: Props) {
  return (
    <div onMouseOver={incrementCount}>
      <span>Hovered {count}</span>
    </div>
  );
}

interface CounterProps {
  render: (count: number, incrementCount: () => void) => ReactNode;
}

function useIncrementCount(){
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  return count;
}

export function CounterF({ render }: CounterProps) {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  return <div>{render(count, incrementCount)}</div>;
}
