// eslint-disable
import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import SearchBar from "material-ui-search-bar";
import TodoList from "./../todo/TodoList";
import NewTodo from "./../todo/NewTodo";
import { useDispatch } from "react-redux";
import { TodosAction } from "../../store/types/TodoTypes";
import { Dispatch } from "redux";
import { getTodos } from "../../store/actions/TodoActions";
import { useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router-dom";
import { onFailure } from "../helper/onFailure";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tablefll: {
      width: "100%",
      overflowX: "auto",
    },
    tablehead: {
      background: "#F5F5FA",
    },
    grow: {
      flexGrow: 1,
    },
    paperspace: {
      padding: theme.spacing(2),
    },
    table: {
      minWidth: "600px",
    },
    flexEnd: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
    },
    noneInSmall: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

const requestSearch = (searchedVal: string) => {
  //const filteredRows = mainlist.filter((row) => {
  //    return row.reference.toLowerCase().includes(searchedVal.toLowerCase()) || (row.description != null && row.description.toLowerCase().includes(searchedVal.toLowerCase()));
  //});
  // setArticles(filteredRows);
};

const cancelSearch = () => {
  //loadArticles();
};

const Dashboard: React.FunctionComponent = () => {
  const [searched, setSearched] = useState<string>("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const [showAddNewTodo, setShowAddNewTodo] = useState<boolean>(false);
  const loadTodos = async () => {
    dispatch(
      getTodos({
        onFailure: onFailure(history),
      })
    );
  };
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ padding: "20px 10px" }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paperspace}>
            <Grid container spacing={3}>
              <Grid item md={10} xs={10}>
                <h5>TODO LIST</h5>
              </Grid>
              <Grid item md={2} xs={2}>
                <Button
                  onClick={() => setShowAddNewTodo(true)}
                  variant="contained"
                  name="submit"
                  className="btn btn-dark float-right"
                >
                  {t("mainpage.common.newTodo")}
                </Button>
              </Grid>
            </Grid>

            <hr />

            <TodoList loadFunction={loadTodos} />
          </Paper>
        </Grid>
      </Grid>
      <Modal show={showAddNewTodo}>
        <Modal.Header>
          <Modal.Title>{t("mainpage.common.newTodo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewTodo
            setShowAddNewTodo={setShowAddNewTodo}
            loadFunction={loadTodos}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
