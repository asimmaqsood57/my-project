import React, { useContext, useState } from "react";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    Tabs,
    Box,
    Tab,
    Paper,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchBar from "material-ui-search-bar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination, {
    TablePaginationProps,
} from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { toast } from "react-toastify";

import { CircularProgress, Checkbox, Breadcrumbs } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Backdrop from "@material-ui/core/Backdrop";
import Topbar from "../03-Topbar/topbar";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MainContent, useMainContext } from "../../App";
import { useDispatch } from "react-redux";
import {
    getDocumentTypes,
    getInvoiceTypes,
    getPaymentTerms,
} from "../../store/actions/DataActions";
import { onFailure } from "../helper/onFailure";
import { useAppSelector } from "../../store/hooks";
import { PaymentTerm } from "../../store/types/DataTypes";
import {
    getCompany,
    getCompanyShareCapital,
    getCompanyAddress,
    getVatNumber,
    updateVatNumber,
} from "../../store/actions/CompanyActions";
import { getUsers } from "../../store/actions/UserActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
        mainBg: {
            background: "#426DEE",
            flexGrow: 1,
        },
        mihHeight: {
            minHeight: "100vh",
            "@media (max-width: 960px)": {
                minHeight: "1px !important;",
            },
        },
        leftcard: {
            background: "#ffffff",
            borderRadius: "0px 20px 20px 0px",
            width: "55%",
            "@media (max-width: 960px)": {
                width: "100%",
            },
        },
        rightcard: {
            textAlign: "center",
            width: "45%",
            "@media (max-width: 960px)": {
                width: "100%",
            },
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

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

const Accountsetting = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { data: invoiceType = [] } = useAppSelector((s) => s.invoiceTypes);
    const { data: paymentTerms = [] } = useAppSelector((s) => s.paymentTerms);
    const { data: documentType = [] } = useAppSelector((s) => s.documentTypes);
    const { data: users = [] } = useAppSelector((s) => s.users);
    const token = localStorage.getItem("userToken");
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [saftDate, setSaftDate] = React.useState<Date | null>(new Date());
    const [saftDate1, setSaftDate1] = React.useState<Date | null>(new Date());
    const [saftDate2, setSaftDate2] = React.useState<Date | null>(new Date());
    const [saftDate3, setSaftDate3] = React.useState<Date | null>(new Date());
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleClose = () => {
        setOpen(false);
    };
    const handleSaftRequest1 = async (event: React.FormEvent<HTMLFormElement>) => {
        setOpenLoader(true);
        event.preventDefault();
        try {
            {
                await axios
                    .post(SERVER_URL + `/saftByYearAndMonth/${token}`, sendSaftReq1)
                    .then((response) => {
                        setTimeout(() => {
                            setOpenLoader(false);
                        }, 1000);
                    });
                toast.success(
                    t("mainpage.side_menu.settings") +
                    " " +
                    t("mainpage.common.updatedSuccessfully")
                );
            }
            setTimeout(() => {
                setOpenLoader(false);
            }, 1000);
        } catch (error) {
            setOpenLoader(false);
            onFailure(history)(error);
        }
    };
    const handleSaftRequest2 = async (event: React.FormEvent<HTMLFormElement>) => {
        setOpenLoader(true);
        event.preventDefault();
        try {
            {
                await axios
                    .post(SERVER_URL + `/saftByPeriod/${token}`, sendSaftReq2)
                    .then((response) => {
                        setTimeout(() => {
                            setOpenLoader(false);
                        }, 1000);
                    });
                toast.success(
                    t("mainpage.side_menu.settings") +
                    " " +
                    t("mainpage.common.updatedSuccessfully")
                );
            }
            setTimeout(() => {
                setOpenLoader(false);
            }, 1000);
        } catch (error) {
            setOpenLoader(false);
            onFailure(history)(error);
        }
    };
    const handleSaftRequest3 = async (event: React.FormEvent<HTMLFormElement>) => {
        setOpenLoader(true);
        event.preventDefault();
        try {
            {
                await axios
                    .post(SERVER_URL + `/saftByYear/${token}`, sendSaftReq3)
                    .then((response) => {
                        setTimeout(() => {
                            setOpenLoader(false);
                        }, 1000);
                    });
                toast.success(
                    t("mainpage.side_menu.settings") +
                    " " +
                    t("mainpage.common.updatedSuccessfully")
                );
            }
            setTimeout(() => {
                setOpenLoader(false);
            }, 1000);
        } catch (error) {
            setOpenLoader(false);
            onFailure(history)(error);
        }
    };

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
        loadUsers();
        loadPaymentTerms();
        loadInvoiceTypes();
        loadDocumentTypes();
        loadSettings1();
        loadSettings2();
        loadSettings3();
        loadSettings4();
    }, []);

    const [value, setValue] = React.useState(0);
    const loadUsers = () => {
        dispatch(getUsers({ onFailure: onFailure(history) }));
    };
    const loadPaymentTerms = () => {
        dispatch(getPaymentTerms({ onFailure: onFailure(history) }));
    };
    const loadInvoiceTypes = () => {
        dispatch(getInvoiceTypes({ onFailure: onFailure(history) }));
    };

    const loadDocumentTypes = () => {
        dispatch(getDocumentTypes({ onFailure: onFailure(history) }));
    };

    const [companyName, setCompanyName] = useState<any>();
    const [companyVATNumber, setCompanyVATNumber] = useState<any>();
    const [companyAddressDetail, setCompanyAddressDetail] = useState<any>();
    const [companyShareCapital, setCompanyShareCapital] = useState<any>();
    const [openLoader, setOpenLoader] = useState(false);
    const loadSettings1 = () => {
        dispatch(
            getVatNumber({
                onFailure: onFailure(history),
                onSuccess: (r) => setCompanyVATNumber(r.settingStringValue),
            })
        );
    };

    const loadSettings2 = () => {
        dispatch(
            getCompany({
                onFailure: onFailure(history),
                onSuccess: (r) => setCompanyName(r.settingStringValue),
            })
        );
    };

    const loadSettings3 = () => {
        dispatch(
            getCompanyAddress({
                onFailure: onFailure(history),
                onSuccess: (r) => setCompanyAddressDetail(r.settingStringValue),
            })
        );
    };

    const loadSettings4 = () => {
        dispatch(
            getCompanyShareCapital({
                onFailure: onFailure(history),
                onSuccess: (r) => setCompanyShareCapital(r.settingStringValue),
            })
        );
    };
    const sendSaftReq1 = {
        SAFTYear: saftDate?.getFullYear() || 0,
        SAFTMonth: saftDate?.getMonth()+1 || 0,
    };
    const sendSaftReq2 = {
        SAFTDateIni: saftDate1?.toISOString(),
        SAFTDateEnd: saftDate2?.toISOString(),
    };
    const sendSaftReq3 = {
        SAFTYear: saftDate3?.getFullYear() || 0,
    };
    const handleSettingsSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        dispatch(
            updateVatNumber(
                { SettingStringValue: companyVATNumber },
                { onFailure: onFailure(history) }
            )
        );
    };

    // const [order, setOrder] = React.useState<Order>("desc");
    // const [orderBy, setOrderBy] = React.useState<keyof any>("date");

    // function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    //   console.warn(a, b, orderBy);
    //   if (b[orderBy] < a[orderBy]) return -1;
    //   if (b[orderBy] > a[orderBy]) return 1;
    //   return 0;
    // }

    // type Order = "asc" | "desc";
    const handleAddPaymentTerm = () => {
        history.push(`/home/paymentTerm/0`);
    };
    const handleAddUser = () => {
        history.push(`/home/user/0`);
    };
    const handleAddInvoiceType = () => {
        history.push(`/home/invoiceType/0`);
    };
    const handleAddDocumentType = () => {
        history.push(`/home/documentType/0`);
    };
    // function getComparator<T, Key extends keyof T>(
    //   order: Order,
    //   orderBy: Key
    // ): (
    //   a: { [key in Key]: number | string },
    //   b: { [key in Key]: number | string }
    // ) => number {
    //   return order === "desc"
    //     ? (a, b) => descendingComparator(a, b, orderBy)
    //     : (a, b) => -descendingComparator(a, b, orderBy);
    // }
    // function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    //   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    //   stabilizedThis.sort((a, b) => {
    //     const order = comparator(a[0], b[0]);
    //     if (order !== 0) return order;
    //     return a[1] - b[1];
    //   });
    //   return stabilizedThis.map((el) => el[0]);
    // }

    const requestSearch = (searchedVal: string) => {
        // const filteredRows = users.filter((row) => {
        //   return row.customerName.toLowerCase().includes(searchedVal.toLowerCase());
        // });
        // setUsers(filteredRows);
    };

    const cancelSearch = () => {
        loadUsers();
    };
    const [searched, setSearched] = useState<string>("");
    function handleChange(event: any, newValue: any) {
        setValue(newValue);
    }
    // const [users, setUsers] = useState<any[]>([]);
    const { show } = useMainContext();
    return (
        <div style={{ padding: "10px" }} className={show ? "ml" : "ss"}>
            <Backdrop className={classes.backdrop} open={openLoader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item md={12} xs={12}>
                <Paper className={classes.tablefll}>
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label={t("mainpage.common.companySettings")} />
                            <Tab label={t("mainpage.common.users")} />
                            <Tab label={t("mainpage.common.taxAuthority")} />
                            <Tab label={t("mainpage.common.paymentTerms")} />
                            {/*<Tab label={t("mainpage.common.invoiceTypes")} />*/}
                            {/*<Tab label={t("mainpage.common.documentTypes")} />*/}
                        </Tabs>
                    </Box>
                </Paper>
            </Grid>
            <br />
            <Grid item md={12} xs={12}>
                <Paper>
                    <TabPanel value={value} index={0}>
                        <form className="update" onSubmit={handleSettingsSubmit}>
                            <Grid item md={12} xs={12}>
                                {t("mainpage.common.companyName")}
                            </Grid>
                            <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                                <TextField
                                    type="text"
                                    value={companyName}
                                    onChange={(r) => setCompanyName(r.target.value)}
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    inputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                {t("mainpage.common.vatNumber")}
                            </Grid>
                            <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                                <TextField
                                    type="text"
                                    value={companyVATNumber}
                                    onChange={(r) => setCompanyVATNumber(r.target.value)}
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    inputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                {t("mainpage.common.companyAddress")}
                            </Grid>
                            <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                                <TextField
                                    type="text"
                                    value={companyAddressDetail}
                                    onChange={(r) => setCompanyAddressDetail(r.target.value)}
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    inputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                {t("mainpage.common.companyShareCapital")}
                            </Grid>
                            <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                                <TextField
                                    type="text"
                                    value={companyShareCapital}
                                    onChange={(r) => setCompanyShareCapital(r.target.value)}
                                    variant="outlined"
                                    style={{ width: "100%" }}
                                    inputProps={{ disableUnderline: true }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Paper className={classes.tablefll}>
                                    <Button
                                        type="submit"
                                        style={{ width: "100%" }}
                                        variant="contained"
                                        name="submit"
                                        className="btn btn-dark float-left"
                                    >
                                        {t("mainpage.common.save")}
                                    </Button>
                                </Paper>
                            </Grid>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{ padding: 20 }}>
                            <Topbar addLink={handleAddUser} />
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
                                </DialogActions>
                            </Dialog>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12} className={classes.flexEnd}>
                                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                                        <Breadcrumbs separator="&raquo;" aria-label="breadcrumb">
                                            <Link color="inherit" href="/home/accountsettings">
                                                {t("mainpage.common.users")}
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
                                    <SearchBar
                                        value={searched}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                        placeholder={t("mainpage.common.search")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead className={classes.tablehead}>
                                                <TableRow>
                                                    <TableCell>{t("mainpage.common.username")}</TableCell>
                                                    <TableCell>{t("mainpage.common.name")}</TableCell>
                                                    <TableCell>{t("mainpage.common.profile")}</TableCell>
                                                    <TableCell>{t("mainpage.common.email")}</TableCell>
                                                    <TableCell>{t("mainpage.common.active")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((item) => {
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={item.id}
                                                                className={classes.hover}
                                                                onClick={() =>
                                                                    history.push(`/home/user/${item.id}`)
                                                                }
                                                            >
                                                                <TableCell>{item.username}</TableCell>
                                                                <TableCell>{item.fullname}</TableCell>
                                                                <TableCell>{item.profile}</TableCell>
                                                                <TableCell>{item.email}</TableCell>
                                                                <TableCell>
                                                                    {item.active
                                                                        ? t("mainpage.common.yes")
                                                                        : t("mainpage.common.no")}
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
                                        count={users.length}
                                        rowsPerPage={rowsPerPage}
                                        backIconButtonText={t("mainpage.common.previous")}
                                        nextIconButtonText={t("mainpage.common.next")}
                                        labelRowsPerPage={t("mainpage.common.rowsPerPage")}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.extratSAFTPT1")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                            <form
                                style={{ height: "100px" }}
                                onSubmit={(event) => handleSaftRequest1(event)}
                            >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        views={["year", "month"]}
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        style={{ width: "100%" }}
                                        format="yyyy-MM"
                                        value={saftDate}
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={setSaftDate}
                                    />
                                    <Button
                                        type="submit"
                                        style={{ width: "100%", margin: "10px 0" }}
                                        variant="contained"
                                        name="submit"
                                        className="btn btn-dark float-left"
                                    >
                                        {t("mainpage.common.generate")}
                                    </Button>
                                </MuiPickersUtilsProvider>
                            </form>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.extratSAFTPT2")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                            <form
                                style={{ height: "100px" }}
                                onSubmit={(event) => handleSaftRequest2(event)}
                            >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        style={{ width: "100%" }}
                                        format="yyyy-MM-dd"
                                        value={saftDate1}
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={setSaftDate1}
                                    />
                                </MuiPickersUtilsProvider>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        disableFuture={true}
                                        style={{ width: "100%" }}
                                        format="yyyy-MM-dd"
                                        value={saftDate2}
                                        minDate={saftDate1}
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={setSaftDate2}
                                    />
                                </MuiPickersUtilsProvider>
                                <Button
                                    type="submit"
                                    style={{ width: "100%", margin: "10px 0" }}
                                    variant="contained"
                                    name="submit"
                                    className="btn btn-dark float-left"
                                >
                                    {t("mainpage.common.generate")}
                                </Button>
                            </form>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.extratSAFTPT3")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                            <form
                                style={{ height: "100px" }}
                                onSubmit={(event) => handleSaftRequest3(event)}
                            >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        views={["year"]}
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        style={{ width: "100%" }}
                                        format="yyyy"
                                        value={saftDate3}
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={setSaftDate3}
                                    />
                                    <Button
                                        type="submit"
                                        style={{ width: "100%", margin: "10px 0" }}
                                        variant="contained"
                                        name="submit"
                                        className="btn btn-dark float-left"
                                    >
                                        {t("mainpage.common.generate")}
                                    </Button>
                                </MuiPickersUtilsProvider>
                            </form>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div style={{ padding: 20 }}>
                            <Topbar addLink={handleAddPaymentTerm} />
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
                                </DialogActions>
                            </Dialog>

                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12} className={classes.flexEnd}>
                                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                                        <Breadcrumbs separator="&raquo;" aria-label="breadcrumb">
                                            <Link color="inherit" href="/home/accountsettings">
                                                {t("mainpage.common.paymentTerms")}
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
                                    <SearchBar
                                        value={searched}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                        placeholder={t("mainpage.common.search")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead className={classes.tablehead}>
                                                <TableRow>
                                                    <TableCell>
                                                        {t("mainpage.common.description")}
                                                    </TableCell>
                                                    <TableCell>{t("mainpage.common.status")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {paymentTerms
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((item) => {
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={item.id}
                                                                className={classes.hover}
                                                                onClick={() =>
                                                                    history.push(`/home/paymentTerm/${item.id}`)
                                                                }
                                                            >
                                                                <TableCell>{item.description}</TableCell>
                                                                <TableCell>
                                                                    {item.active ? "Active" : "Not Active"}
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
                                        count={paymentTerms.length}
                                        rowsPerPage={rowsPerPage}
                                        backIconButtonText={t("mainpage.common.previous")}
                                        nextIconButtonText={t("mainpage.common.next")}
                                        labelRowsPerPage={t("mainpage.common.rowsPerPage")}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <div style={{ padding: 20 }}>
                            <Topbar addLink={handleAddInvoiceType} />
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
                                </DialogActions>
                            </Dialog>

                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12} className={classes.flexEnd}>
                                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                                        <Breadcrumbs separator="&raquo;" aria-label="breadcrumb">
                                            <Link color="inherit" href="/home/settings">
                                                {t("mainpage.common.invoiceType")}
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
                                    <SearchBar
                                        value={searched}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                        placeholder={t("mainpage.common.search")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead className={classes.tablehead}>
                                                <TableRow>
                                                    <TableCell>
                                                        {t("mainpage.common.description")}
                                                    </TableCell>
                                                    <TableCell>{t("mainpage.common.status")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {invoiceType
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((item) => {
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={item.id}
                                                                className={classes.hover}
                                                                onClick={() =>
                                                                    history.push(`/home/invoiceType/${item.id}`)
                                                                }
                                                            >
                                                                <TableCell>{item.description}</TableCell>
                                                                <TableCell>
                                                                    {item.active ? "Active" : "Not Active"}
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
                                        count={invoiceType.length}
                                        rowsPerPage={rowsPerPage}
                                        backIconButtonText={t("mainpage.common.previous")}
                                        nextIconButtonText={t("mainpage.common.next")}
                                        labelRowsPerPage={t("mainpage.common.rowsPerPage")}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <div style={{ padding: 20 }}>
                            <Topbar addLink={handleAddDocumentType} />
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
                                </DialogActions>
                            </Dialog>

                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12} className={classes.flexEnd}>
                                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                                        <Breadcrumbs separator="&raquo;" aria-label="breadcrumb">
                                            <Link color="inherit" href="/home/settings">
                                                {t("mainpage.common.documentType")}
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
                                    <SearchBar
                                        value={searched}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                        placeholder={t("mainpage.common.search")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead className={classes.tablehead}>
                                                <TableRow>
                                                    <TableCell>
                                                        {t("mainpage.common.description")}
                                                    </TableCell>
                                                    <TableCell>{t("mainpage.common.status")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {documentType
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((item) => {
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={item.id}
                                                                className={classes.hover}
                                                                onClick={() =>
                                                                    history.push(`/home/documentType/${item.id}`)
                                                                }
                                                            >
                                                                <TableCell>{item.description}</TableCell>
                                                                <TableCell>
                                                                    {item.active ? "Active" : "Not Active"}
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
                                        count={documentType.length}
                                        rowsPerPage={rowsPerPage}
                                        backIconButtonText={t("mainpage.common.previous")}
                                        nextIconButtonText={t("mainpage.common.next")}
                                        labelRowsPerPage={t("mainpage.common.rowsPerPage")}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </TabPanel>
                </Paper>
            </Grid>
        </div>
    );
};
export default Accountsetting;
