import React, { ReactElement } from "react";
import { User } from "../models/User";
import Field from "../shared/Field";

interface Props {
  registrate: (user: User) => void;
  cancel: () => void;
}

export default function Registration({
  registrate,
  cancel,
}: Props): ReactElement {
  let user: User = { email: "", id: 0, password: "", name: "" };

  return (
    <div>
      <Field
        type="text"
        label="Name"
        onChange={(e) => {
          user.name = e.target.value;
        }}
        required
      />
      <Field
        type="email"
        label="Email"
        onChange={(e) => {
          user.email = e.target.value;
        }}
        required
      />
      <Field
        type="password"
        label="Password"
        onChange={(e) => {
          user.password = e.target.value;
        }}
        required
      />

      <div className="buttons">
        <button onClick={() => registrate(user)}>Submit</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
}
