import React, { ReactElement, useState } from "react";
import axios from "./api/axios";

export default function AxiosInput(): ReactElement {
  const [value, setValue] = useState("");

  async function onClickHandle() {
    const model = {
      id: Date.now(),
      name: value,
      email: `${value}@${value}.com`,
    };

    const result = await axios.post("people", model);
    console.log(result);
    setValue("");
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onClickHandle}>add</button>
    </div>
  );
}
