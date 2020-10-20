import React, { ReactElement } from "react";
import { User } from "../models/User";

interface Props {
  user: User;
}

export default function Welcome({ user }: Props): ReactElement {
  return (
    <div className="welcome">
      <span>Welcome {user.name}, how are you doing?</span>
      <span>Please verify your email ({user.email})</span>
    </div>
  );
}
