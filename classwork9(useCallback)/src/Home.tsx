import React, { ReactElement } from "react";
import style from "./Home.module.css";

interface Props {}

export default function Home({}: Props): ReactElement {
  console.log(style);
  return (
    <div className={style.welcome}>
      <h1>Welcome to Home</h1>
    </div>
  );
}
