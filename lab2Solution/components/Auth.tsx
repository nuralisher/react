import React, {  ReactElement } from "react";
import { User } from "../models/User";
import Field from "../shared/Field";

interface Props {
  login: (user: User) => void;
  cancel: () => void;
}

export default function Auth({ login, cancel }: Props): ReactElement {
  let user: User = { email: "", id: 0, password: "", name: "" };

  return (
    <div>
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
        <button onClick={cancel}>Cancel</button>
        <button onClick={() => login(user)}>Submit</button>
      </div>
    </div>
  );
}
