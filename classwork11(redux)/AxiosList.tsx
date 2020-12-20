import React, { Fragment, ReactElement, useEffect, useState } from "react";
import axios from "./api/axios";
import AxiosInput from "./AxiosInput";

interface Props {
  fetchUrl: string;
}

export default function AxiosList({ fetchUrl }: Props): ReactElement {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(fetchUrl, {
        params: {
          _limit: 1,
          _start: 1,
        },
      });
      console.log(result);
      setData([...(result as any)]);
    }

    fetchData();
  }, []);

  async function onDeleteHandle(id: number) {
    const res = await axios.delete(`${fetchUrl}/${id}`);
    setData([...data.filter((d) => d.id !== id)]);
  }

  async function onPatchHandle(id: number, value: string) {
    const model = data.find((d) => d.id === id);
    model.name = value;
    model.email = `${value}@${value}.com`;
    const res = await axios.patch(`${fetchUrl}/${id}`, model);
    setData([...data]);
  }

  return (
    <div>
      <AxiosInput />
      {data.map((d) => (
        <Fragment key={d.id}>
          <h2 onClick={() => onPatchHandle(d.id, `${d.name} a`)}>
            {d.name} <p>{d.email}</p>
          </h2>
          <button onClick={() => onDeleteHandle(d.id)}> Delete</button>
        </Fragment>
      ))}
    </div>
  );
}
