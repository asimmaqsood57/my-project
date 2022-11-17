import React, { useContext, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import Pagination from "@material-ui/lab/Pagination";
import { usePagination } from "@material-ui/lab/Pagination";

import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  TableFooter,
  Typography,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchBar from "material-ui-search-bar";
import Topbar from "../03-Topbar/topbar";
import { MainContent, useMainContext } from "../../App";
import { deleteArticle, getArticles } from "../../store/actions/ArticleActions";
import { useDispatch } from "react-redux";
import { Article } from "../../store/types/ArticleTypes";
import { useAppSelector } from "../../store/hooks";
import { onFailure } from "../helper/onFailure";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    tablefll: {
      width: "100%",
      display: "flex",
      overflowX: "auto",
    },
    tablehead: {
      background: "#F5F5FA",
    },
    grow: {
      flexGrow: 1,
    },
    hover: {
      "&:hover": {
        backgroundColor: "rgba(72, 106, 243, 0.1) !important",
        cursor: "pointer",
      },
    },
    paperspace: {
      padding: theme.spacing(2),
      marginTop: "20px",
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

const Articleslist = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: articles = [], loading } = useAppSelector(
    (state) => state.articles
  );
  const { loading: deleteArticleLoading } = useAppSelector(
    (state) => state.deleteArticle
  );
  const [openLoader, setOpenLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number>();
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Article>("id");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("Handle Change Page called.");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Handle Change Rows per Page called.");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setDeleteId(item.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadArticles = async () => {
    dispatch(
      getArticles({
        onFailure: onFailure(history),
      })
    );
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (typeof a === "boolean" || typeof b === "boolean") {
      return 0;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof Article>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean | null },
    b: { [key in Key]: number | string | boolean | null }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    console.warn(stabilizedThis);
    return stabilizedThis.map((el) => el[0]);
  }

  const requestSearch = (searchedVal: string) => {
    const filteredRows = articles.filter((row) => {
      return (
        row.reference.toLowerCase().includes(searchedVal.toLowerCase()) ||
        (row.description != null &&
          row.description.toLowerCase().includes(searchedVal.toLowerCase()))
      );
    });
    // setArticles(filteredRows);
  };

  const cancelSearch = () => {
    loadArticles();
  };
  const deleteArticles = async () => {
    if (deleteId) {
      dispatch(
        deleteArticle(deleteId, {
          onFailure: onFailure(history),
        })
      );
    }
  };
  const handleAddLink = () => {
    history.push(`/home/article/0`);
  };
  const { show } = useMainContext();
  return (
    <div style={{ padding: "10px" }} className={show ? "sl" : "ss"}>
      <Topbar addLink={handleAddLink} />
      <Backdrop
        className={classes.backdrop}
        open={loading || deleteArticleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("mainpage.common.areYouSureMessage")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("mainpage.common.deleteMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("mainpage.common.cancel")}
          </Button>
          <Button onClick={() => deleteArticles()} color="primary" autoFocus>
            {t("mainpage.common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12} className={classes.flexEnd}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/home/articles">
              {t("mainpage.side_menu.articles")}
            </Link>
            <Typography color="textPrimary">
              {t("mainpage.side_menu.list")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.tablehead}>
                <TableRow>
                                  <TableCell>{t("mainpage.common.reference")}</TableCell>
                                  <TableCell>{t("mainpage.common.description")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  // stableSort<Article>(articles, getComparator(order, orderBy))
                  articles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        //articles && articles.map((item) => (
                        <TableRow
                          tabIndex={-1}
                          key={Math.random()}
                          className={classes.hover}
                          onClick={() =>
                            history.push(`/home/article/${item.id}`)
                          }
                        >
                          <TableCell>{item.reference}</TableCell>
                          <TableCell>{item.description}</TableCell>
                        </TableRow>
                      );
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 15, 50]}
                      count={articles.length}
                      component="div"
            rowsPerPage={rowsPerPage}
            backIconButtonText={t("mainpage.common.previous")}
            nextIconButtonText={t("mainpage.common.next")}
            labelRowsPerPage={t("mainpage.common.rowsPerPage")}
            page={page}
            onChangePage={handleChangePage}
            onPageChange={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Articleslist;
