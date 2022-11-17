import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { addTodo } from "../../store/actions/TodoActions";
import { useDispatch } from "react-redux";
import { Dispatch as ReduxDispatch } from "redux";
import { TodoAction } from "../../store/types/TodoTypes";

interface Props {
  loadFunction: () => void;
  setShowAddNewTodo: Dispatch<SetStateAction<boolean>>;
}

const NewTodo = (props: Props) => {
  const dispatch = useDispatch<ReduxDispatch<TodoAction>>();
  const [text, setText] = useState("");
  const addTodos = () => {
    setText("");
    addTodo(
      { title: text },
      {
        onSuccess: () => {
          props.loadFunction();
          props.setShowAddNewTodo(false);
        },
      }
    )(dispatch);
  };
  return (
    <li>
      <input
        value={text}
        placeholder="Enter title..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodos}>Add</button>
    </li>
  );
};

export default React.memo(NewTodo);
