import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Dashboard from "../02-Dashboard/dashboard";
import { Fade, Grid } from "@material-ui/core";
import Topbar from "../03-Topbar/topbar";
import SideMenuList from "../04-Sidemenulist/sidemenulist";
import { Switch, useHistory } from "react-router-dom";
import Invoice from "../05-Invoice/invoice";
import Document from "../05-Documents/document";
import ProtectedRoute from "../Routs-auth/auth";
import Profile from "../05-Profile/Profile";
import Accountsetting from "../05-Profile/settings";
import Articleslist from "../05-Article/articleslist";
import Invoicelist from "../05-Invoice/invoicelist";
import Documentlist from "../05-Documents/documentlist";
import Article from "../05-Article/article";
import Supplierlist from "../05-Supplier/supplierlist";
import Supplier from "../05-Supplier/supplier";
import Customerlist from "../05-Customer/customerlist";
import Customer from "../05-Customer/customer";
import User from "../05-User/user";
import PaymentTerm from "../05-Profile/paymentTerm";
import InvoiceType from "../05-Profile/invoiceType";
import DocumentType from "../05-Profile/documentType";
import Header from "../03-Topbar/header";
import { useMainContext } from "../../App";
import { useDispatch } from "react-redux";
import {
    getInvoiceTypes,
    getPaymentTerms,
    getTaxes,
    getTaxExemptionReasons,
    getUnits,
    getPaymentTermsActive,
    getSaftProductType,
    getDocumentTypes,
} from "../../store/actions/DataActions";
import { onFailure as failureFunc } from "../helper/onFailure";
import "react-confirm-alert/src/react-confirm-alert.css";

const drawerWidth = 240;
const smdrawerWidh = 72;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexFlow: "0",
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.down("xs")]: {
                width: smdrawerWidh,
            },
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: theme.spacing(9) + 1,
            [theme.breakpoints.down("xs")]: {
                width: smdrawerWidh,
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            overflow: "auto",
        },
        noneInSmall: {
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
    })
);

function Home() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const { show, setShow } = useMainContext();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        const onFailure = failureFunc(history);
        // Loading Payment Terms
        dispatch(getPaymentTerms({ onFailure }));
        // Loading Taxes
        dispatch(getTaxes({ onFailure }));
        // Loading Units
        dispatch(getUnits({ onFailure }));
        // Loading Tax Exemption Reasons
        dispatch(getTaxExemptionReasons({ onFailure }));
        // Loading Invoice Types
        dispatch(getInvoiceTypes({ onFailure }));
        // Loading Payment Terms Active
        dispatch(getPaymentTermsActive({ onFailure }));
        // Loading Saft Product Type
        dispatch(getSaftProductType({ onFailure }));
        // Loading Document Types
        dispatch(getDocumentTypes({ onFailure }));
    }, [dispatch, history]);
    return (
        <>
            <Header setShow={setShow} />
            <Grid style={{ overflow: "hidden" }} container spacing={0}>
                {
                    <Drawer
                        transitionDuration={500}
                        variant="persistent"
                        style={!show ? { display: "none" } : { display: "block" }}
                        open={show}
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <SideMenuList setShow={setShow} />
                    </Drawer>
                }
                <Grid item xs>
                    <Switch>
                        <ProtectedRoute path="/home/dashboard" component={Dashboard} />
                        <ProtectedRoute
                            path="/home/invoice/:id/:id2?/:id3?"
                            component={Invoice}
                        />
                        <ProtectedRoute path="/home/invoices" component={Invoicelist} />
                        <ProtectedRoute path="/home/document/:id" component={Document} />
                        <ProtectedRoute path="/home/documents" component={Documentlist} />
                        <ProtectedRoute path="/home/profile" component={Profile} />
                        <ProtectedRoute path="/home/settings" component={Accountsetting} />
                        <ProtectedRoute path="/home/articles" component={Articleslist} />
                        <ProtectedRoute path="/home/article/:id" component={Article} />
                        <ProtectedRoute path="/home/suppliers" component={Supplierlist} />
                        <ProtectedRoute path="/home/supplier/:id" component={Supplier} />
                        <ProtectedRoute path="/home/customers" component={Customerlist} />
                        <ProtectedRoute path="/home/customer/:id" component={Customer} />
                        <ProtectedRoute path="/home/user/:id" component={User} />
                        <ProtectedRoute
                            path="/home/paymentTerm/:id"
                            component={PaymentTerm}
                        />
                        <ProtectedRoute
                            path="/home/invoiceType/:id"
                            component={InvoiceType}
                        />
                        <ProtectedRoute
                            path="/home/documentType/:id"
                            component={DocumentType}
                        />
                    </Switch>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
