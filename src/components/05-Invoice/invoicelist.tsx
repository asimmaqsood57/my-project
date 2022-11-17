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
import { getInvoices } from "../../store/actions/InvoiceActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { Invoice, InvoiceRaw, Invoices } from "../../store/types/InvoiceTypes";
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
    table: {
      minWidth: "600px",
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
      padding: theme.spacing(1),
      marginTop: "5px",
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

function getComparator<Key extends keyof InvoiceRaw>(
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
  return stabilizedThis.map((el) => el[0]);
}

const Invoicelist = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { data: invoices = [], loading } = useAppSelector(
    (state) => state.invoices
  );
  const [open, setOpen] = React.useState(false);
  const [searched] = useState<string>("");
  const [order] = React.useState<Order>("desc");
  const [orderBy] = React.useState<keyof InvoiceRaw>("creationDate");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [filteredInvoices, setInvoices] = useState<Invoices>([]);

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
    loadInvoices();
  }, []);

  const handleClickOpen = (item: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setInvoices(invoices);
  }, [invoices]);

  const loadInvoices = async () => {
    dispatch(
      getInvoices({
        onFailure: onFailure(history),
      })
    );
  };

  const requestSearch = (searchedVal: string) => {
    const filteredRows = invoices.filter((row) => {
      return row.customerName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setInvoices(filteredRows);
  };

  const cancelSearch = () => {
    loadInvoices();
  };

  const handleAddLink = () => {
    history.push(`/home/invoice/0`);
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
              <Link color="inherit" href="/home/invoices">
                {t("mainpage.side_menu.invoices")}
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
                    <div style={{ width: "100px" }}>
                      {t("mainpage.common.invoiceType")}
                    </div>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div style={{ width: "100px" }}>
                      {t("mainpage.common.invoiceNumber")}
                    </div>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div style={{ width: "100px" }}>
                      {t("mainpage.common.invoiceDate")}
                    </div>{" "}
                  </TableCell>
                  <TableCell>
                    <div style={{ width: "400px" }}>
                      {t("mainpage.common.customer")}
                    </div>
                  </TableCell>
                  <TableCell>{t("mainpage.common.value")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(filteredInvoices, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={item.id}
                        className={classes.hover}
                        onClick={() => history.push(`/home/invoice/${item.id}`)}
                      >
                        <TableCell>{item.invoiceType}</TableCell>
                        <TableCell>{item.invoiceNumber}</TableCell>
                        <TableCell>
                          {moment(item.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell style={{ width: "300px" }}>
                          {item.customerName}
                        </TableCell>
                        <TableCell>{item.totalValue} &euro;</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              rowsPerPageOptions={[10, 15, 50]}
              onPageChange={handleChangePage}
              count={invoices.length}
              rowsPerPage={rowsPerPage}
              backIconButtonText={t("mainpage.common.previous")}
              nextIconButtonText={t("mainpage.common.next")}
              labelRowsPerPage={t("mainpage.common.rowsPerPage")}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Invoicelist;
