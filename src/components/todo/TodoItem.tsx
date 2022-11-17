import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { deleteTodo } from "../../store/actions/TodoActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { Todo } from "../../store/types/TodoTypes";

interface ItemProps {
  todo: Todo;
  loadFunction: () => void;
}

const renderHighlight = (title: string, query?: string) => {
  if (!query) return title;
  const index = title.indexOf(query);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <b>{query}</b>
      {title.slice(index + query.length)}
    </>
  );
};

const TodoItem = ({ todo, loadFunction }: ItemProps) => {
  const dispatch = useDispatch();
  const { loading } = useAppSelector((state) => state.deleteTodo);
  const delTodo = () => {
    dispatch(
      deleteTodo(todo.id, {
        onSuccess: () => loadFunction(),
      })
    );
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={10} xs={10}>
          {todo.completed ? todo.title : renderHighlight(todo.title)}
        </Grid>
        <Grid item md={2} xs={2}>
          <Button
            variant="contained"
            name="submit"
            onClick={delTodo}
            disabled={loading}
            className="btn btn-dark float-right"
          >
            Apagar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(TodoItem);
