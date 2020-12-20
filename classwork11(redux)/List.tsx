import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  getItems: (value: number) => number[];
}

export default function List({ getItems }: Props): ReactElement {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    setItems(getItems(5));
    console.error("Updating List");
  }, [getItems]);

  return (
    <div>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
