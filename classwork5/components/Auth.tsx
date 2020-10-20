import React, { ReactElement, useEffect, useRef } from "react";
import { User } from "../models/User";
import Field from "../shared/Field";

interface Props {
  login: (user: User) => void;
  cancel: () => void;
}

export default function Auth({ login, cancel }: Props): ReactElement {
  let user: User = { email: "", id: 0, password: "", name: "" };
  const email = useRef<HTMLInputElement>(null);

  useEffect(() => {
    email.current?.focus();
  }, []);

  return (
    <div>
      <Field
        type="email"
        label="Email"
        ref={email}
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
