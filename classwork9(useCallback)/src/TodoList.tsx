import React, { FormEvent, ReactElement, useReducer, useState } from "react";
import Todo from "./Todo";

export enum Actions {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
}

export interface ITodo {
  id: number;
  name: string;
  complete: boolean;
}

export interface Action {
  type: Actions;
  payload: any;
}

function reducer(todos: ITodo[], action: Action) {
  switch (action.type) {
    case Actions.ADD_TODO:
      return [...todos, addTodo(action.payload.name)];

    case Actions.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });

    case Actions.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

function addTodo(name: string): ITodo {
  return { id: Date.now(), name, complete: false };
}

export default function TodoList(): ReactElement {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: Actions.ADD_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
}
