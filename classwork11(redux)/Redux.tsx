import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxActions } from "./enums/Actions.enum";
import { Logged } from "./enums/Logged";

export default function Redux(): ReactElement {
  const counter = useSelector((state: any) => state.counter);

  const logged = useSelector((state: any) => state.isLogged);

  const dispatch = useDispatch();

  return (
    <div>
      {counter}
      <button
        onClick={() => dispatch({ type: ReduxActions.INCREMENT, payload: 5 })}
      >
        +
      </button>
      <button
        onClick={() => dispatch({ type: ReduxActions.DECREMENT, payload: 3 })}
      >
        -
      </button>

      {logged ? (
        <button onClick={() => dispatch({ type: Logged.SIGN_OUT })}>
          Sign Out
        </button>
      ) : (
        <button onClick={() => dispatch({ type: Logged.SIGN_IN })}>
          Sign In
        </button>
      )}

      {logged ? <div> Secret Infromation between you and me</div> : ""}
    </div>
  );
}
