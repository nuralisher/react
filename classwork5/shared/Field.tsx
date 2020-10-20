import React, { ChangeEvent, ReactElement } from "react";
import "./Field.css";

interface Props {
  label: string;
  type?: "email" | "password" | "text";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Field = React.forwardRef<HTMLInputElement, Props>(
  ({ label, onChange, type, required }: Props, ref): ReactElement => {
    let inputType = "text";

    if (type) {
      inputType = type;
    }

    return (
      <div className="field">
        <span>{label}</span>
        <input
          type={inputType}
          onChange={onChange}
          required={required}
          ref={ref}
        />
      </div>
    );
  }
);

export default Field;
