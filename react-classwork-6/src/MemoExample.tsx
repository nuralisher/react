import React, { ReactElement, useEffect, useMemo, useState } from "react";

export default function MemoExample(): ReactElement {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const powerOfNumber = useMemo(() => slowFunction(number), [number]);

  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("Theme Changed");
  }, [themeStyle]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyle}>{powerOfNumber}</div>
    </div>
  );

  function slowFunction(num: number) {
    for (let i = 0; i <= 1000000000; i++) {}
    const random = Math.random();
    console.log(random);
    if(random>0.6){
      throw new Error('Oh no, something went wrong!');
    }
    return num * num;
  }
}
