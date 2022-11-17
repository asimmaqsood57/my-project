import { useAppSelector } from "../../store/hooks";
import TodoItem from "./TodoItem";

interface ListProps {
  loadFunction: () => void;
}

const TodoList = (props: ListProps) => {
  const { loading, data: todos = [] } = useAppSelector((state) => state.todos);
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} loadFunction={props.loadFunction} />
      ))}

      {loading && todos.length === 0 && <h3>Loading...</h3>}
    </div>
  );
};

export default TodoList;
