import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import List from "./List";
import Modal from "./Modal";

export default function MemoExample(): ReactElement {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getItems = useCallback(
    (value: number) => {
      return [number + value, number + value + 1, number + value + 2];
    },
    [number]
  );

  const powerOfNumber = useMemo(() => slowFunction(number), [number]);

  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? "red" : "white",
      color: dark ? "white" : "black",
      zIndex: 2,
      width: "100%",
    };
  }, [dark]);

  useEffect(() => {
    console.log("Theme Changed");
  }, [themeStyle]);

  return (
    <>
      <div style={{ zIndex: 1 }} onClick={() => console.log("clicked")}>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button
          onClick={() => {
            setDark((prevDark) => !prevDark);
            // setIsOpen(true);
          }}
        >
          Change Theme
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Theme Changed
        </Modal>
      </div>
      <div style={themeStyle}>{powerOfNumber}</div>
      <List getItems={getItems} />
    </>
  );

  function slowFunction(num: number) {
    // for (let i = 0; i <= 1000000000; i++) {}
    return num * num;
  }
}
