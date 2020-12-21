import React, { Dispatch, ReactElement } from "react";
import { Action, Actions, ITodo } from "./TodoList";

interface Props {
  todo: ITodo;
  dispatch: Dispatch<Action>;
}

export default function Todo({ todo, dispatch }: Props): ReactElement {
  return (
    <div
      style={{
        backgroundColor: todo.complete ? "#28772F" : "#FFFFFF",
        color: todo.complete ? "#FFFFFF" : "#000000",
      }}
    >
      <span>{todo.name}</span>
      <button
        onClick={(e) =>
          dispatch({ type: Actions.TOGGLE_TODO, payload: { id: todo.id } })
        }
      >
        Toggle
      </button>
      <button
        onClick={(e) =>
          dispatch({ type: Actions.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        Delete
      </button>
    </div>
  );
}
