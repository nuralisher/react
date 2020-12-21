import React, { ReactElement } from "react";

interface Props {
  heroName: string;
}

export default function Hero({ heroName }: Props): ReactElement {
  if (heroName === "Joker") {
    throw new Error("He is not a Hero");
  }

  return <span>{heroName}</span>;
}
