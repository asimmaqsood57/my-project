import React, { useContext, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
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
import { useDispatch } from "react-redux";
import { getDocuments } from "../../store/actions/DocumentActions";
import { onFailure } from "../helper/onFailure";
import { useAppSelector } from "../../store/hooks";
import { DocumentRaw } from "../../store/types/DocumentTypes";

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
      marginTop: "5px",
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

const Documentlist = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: documents = [], loading } = useAppSelector(
    (state) => state.documents
  );
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof DocumentRaw>("date");

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
    loadDocuments();
  }, []);

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setDeleteId(item.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadDocuments = async () => {
    dispatch(
      getDocuments({
        onFailure: onFailure(history),
      })
    );
  };

  interface IDataTableColumn {
    id: string;
    name: string;
    enableSort?: boolean;
    align?: "center" | "inherit" | "justify" | "left" | "right";
  }

  interface IDataTableHeadProps {
    columns: IDataTableColumn[];
    order: Order;
    orderBy: keyof any;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof any
    ) => void;
  }

  interface IDataTableProps {
    rows: any[];
    columnData?: IDataTableColumn[];
  }

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

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean },
    b: { [key in Key]: number | string | boolean }
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
    const filteredRows = documents.filter((row) => {
      return row.customerName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    // setDocuments(filteredRows);
  };

  const cancelSearch = () => {
    loadDocuments();
  };

  const handleAddLink = () => {
    history.push(`/home/document/0`);
  };
  const { show } = useMainContext();
  return (
    <div style={{ padding: "10px" }} className={show ? "ml" : "ss"}>
      <Topbar addLink={handleAddLink} />
      <Backdrop className={classes.backdrop} open={loading}>
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
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12} className={classes.flexEnd}>
          <Grid item md={12} xs={12} className={classes.flexEnd}>
            <Breadcrumbs separator="&raquo;" aria-label="breadcrumb">
              <Link color="inherit" href="/home/documents">
                {t("mainpage.side_menu.documents")}
              </Link>
              <Typography color="textPrimary">
                {t("mainpage.side_menu.list")}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.tablehead}>
                <TableRow>
                  <TableCell>
                    {" "}
                    <div style={{ width: "200px" }}>
                      {t("mainpage.common.documentType")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div style={{ width: "200px" }}>
                      {t("mainpage.common.documentNumber")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div style={{ width: "100px" }}>
                      {t("mainpage.common.documentDate")}
                    </div>
                  </TableCell>

                  <TableCell>
                    {" "}
                    <div style={{ width: "400px" }}>
                      {t("mainpage.common.customer")}
                    </div>{" "}
                  </TableCell>
                  <TableCell>{t("mainpage.common.value")}</TableCell>
                  <TableCell>{t("mainpage.common.status")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort<DocumentRaw>(
                  documents,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={item.id}
                        className={classes.hover}
                        onClick={() =>
                          history.push(`/home/document/${item.id}`)
                        }
                      >
                        <TableCell>{item.documentType}</TableCell>
                        <TableCell>{item.documentNumber}</TableCell>
                        <TableCell>
                          {moment(item.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.totalValue} &euro;</TableCell>
                        <TableCell>
                          {item.isOpen
                            ? t("mainpage.common.statusOpen")
                            : t("mainpage.common.statusClosed")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 15, 50]}
            onPageChange={handleChangePage}
            count={documents.length}
            rowsPerPage={rowsPerPage}
            backIconButtonText={t("mainpage.common.previous")}
            nextIconButtonText={t("mainpage.common.next")}
            labelRowsPerPage={t("mainpage.common.rowsPerPage")}
                      page={page}
                      component="div"
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Documentlist;
