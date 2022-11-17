import React, { useState } from "react";
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
        backgroundColor: "#5e81f4 !important",
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

const Supplierlist = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER;
  const { t } = useTranslation();
  const token = localStorage.getItem("userToken");
  const classes = useStyles();
  const history = useHistory();

  const [openLoader, setOpenLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [suppliers, setSuppliers] = useState<any[]>([]);
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
    loadSuppliers();
  }, []);

  const handleClickOpen = (item: any) => {
    setOpen(true);
    setDeleteId(item.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadSuppliers = async () => {
    try {
      setOpenLoader(true);
      const result = await axios.get(
          `${SERVER_URL}/supplier/${token}`
      );
      const res = await result.data;
      setSuppliers(res);
      setTimeout(() => {
        setOpenLoader(false);
      }, 1000);
    } catch (error) {
      setOpenLoader(false);
      console.log(error);
      if (error.response.status != undefined && error.response.status === 403) {
        localStorage.clear();
        history.push("/");
      } else if (
        error.response.status != undefined &&
        error.response.status === 400
      ) {
        toast.error(error.response.data.detail);
      }
    }
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
    console.warn(a, b, orderBy);
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
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
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
    const filteredRows = suppliers.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        (row.vatNumber != null &&
          row.vatNumber.toLowerCase().includes(searchedVal.toLowerCase()))
      );
    });
    setSuppliers(filteredRows);
  };

  const cancelSearch = () => {
    loadSuppliers();
  };
  const deleteSuppliers = async () => {
    setOpenLoader(true);
    try {
      const result = await axios.delete(
          `${SERVER_URL}/supplier/${deleteId}/${token}`
      );
      toast.success(
        t("mainpage.side_menu.suppliers") +
          " " +
          t("mainpage.common.deleteSuccessfully")
      );
      loadSuppliers();
      setOpen(false);
    } catch (error) {
      setOpenLoader(false);
      console.log(error);
      if (error.response.status != undefined && error.response.status === 403) {
        localStorage.clear();
        history.push("/");
      } else if (
        error.response.status != undefined &&
        error.response.status === 400
      ) {
        toast.error(error.response.data.detail);
      }
      setOpen(false);
    }
  };
  const handleAddLink = () => {
    history.push(`/home/supplier/0`);
  };
  return (
    <div style={{ padding: 20 }}>
      <Topbar addLink={handleAddLink} />
      <Backdrop className={classes.backdrop} open={openLoader}>
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
          <Button onClick={() => deleteSuppliers()} color="primary" autoFocus>
            {t("mainpage.common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12} className={classes.flexEnd}>
          <Breadcrumbs separator="�" aria-label="breadcrumb">
            <Link color="inherit" href="/home/suppliers">
              {t("mainpage.side_menu.suppliers")}
            </Link>
            <Typography color="textPrimary">
              {t("mainpage.side_menu.list")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Paper className={classes.tablefll}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tablehead}>
                  <TableRow>
                    <TableCell>{t("mainpage.common.name")}</TableCell>
                    <TableCell>{t("mainpage.common.vatNumber")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(suppliers, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        <TableRow
                          tabIndex={-1}
                          key={item.id}
                          className={classes.hover}
                          onClick={() =>
                            history.push(`/home/supplier/${item.id}`)
                          }
                        >
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.vatNumber}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className={classes.paperspace}>
            <TablePagination
              rowsPerPageOptions={[10, 15, 50]}
              onPageChange={handleChangePage}
              count={suppliers.length}
              rowsPerPage={rowsPerPage}
              backIconButtonText={t("mainpage.common.previous")}
              nextIconButtonText={t("mainpage.common.next")}
              labelRowsPerPage={t("mainpage.common.rowsPerPage")}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Supplierlist;
