import React, {
    useState,
    useCallback,
    MutableRefObject,
    Fragment,
} from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    CircularProgress,
    Typography,
    Breadcrumbs,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Backdrop from "@material-ui/core/Backdrop";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import AutoComplete from "@material-ui/lab/AutoComplete";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import NumericEditor from "@inovua/reactdatagrid-community/NumericEditor";

import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "@inovua/reactdatagrid-community/index.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import InvoiceSideMenu from "./invoicesidemenu";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../store/actions/CustomerActions";
import {
    InvoiceType,
    InvoiceTypes,
    PaymentTerm,
    PaymentTerms,
    Tax,
    TaxExemptionReason,
    Unit,
} from "../../store/types/DataTypes";
import { Customer } from "../../store/types/CustomerTypes";
import {
    addInvoice,
    getInvoice,
    updateInvoice,
} from "../../store/actions/InvoiceActions";
import { InvoiceLine, InvoiceRequest } from "../../store/types/InvoiceTypes";
import { getArticles } from "../../store/actions/ArticleActions";
import { onFailure } from "../helper/onFailure";
import { Article } from "../../store/types/ArticleTypes";

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
        paperspace: {
            padding: theme.spacing(2),
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
        flexEnd: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
        },
        tablefll: {
            width: "100%",
            display: "flex",
            overflowX: "auto",
        },
    })
);

const Invoice = (props: any) => {
    const { data: customers = [], loading: customersLoading } = useAppSelector(
        (state) => state.customers
    );
    const { data: paymentTerms = [], loading: paymentTermLoading } =
        useAppSelector((state) => state.paymentTerms);
    const { data: paymentTermActive = [], loading: paymentTermActiveLoading } =
        useAppSelector((state) => state.paymentTermsActive);
    const { data: units = [], loading: unitsLoading } = useAppSelector(
        (state) => state.units
    );
    const { data: invoice, loading: invoiceLoading } = useAppSelector(
        (state) => state.invoice
    );
    const { data: taxExemptionReason = [], loading: taxExemptionReasonLoading } =
        useAppSelector((state) => state.taxExemptionReasons);
    const { data: invoiceTypes = [], loading: invoiceTypeLoading } =
        useAppSelector((s) => s.invoiceTypes);
    const { data: taxes = [], loading: taxesLoading } = useAppSelector(
        (state) => state.taxes
    );
    const { data: articles = [], loading: articlesLoading } = useAppSelector(
        (state) => state.articles
    );
    const { loading: addLoading } = useAppSelector((s) => s.addInvoice);
    const { loading: updateLoading } = useAppSelector((s) => s.updateInvoice);
    const [paymentTerm, setPaymentTerms] = useState<PaymentTerms>([]);
    const [DRAFT, setDraft] = useState<boolean | null>(null);
    const [showDueDate, setShowDueDate] = useState<boolean>(true);

    const [invoiceTypeSelected, setInvoiceTypeSelected] =
        useState<InvoiceType | null>(null);
    const [taxExemptionReasonSelected, setTaxExemptionReasonSelected] =
        useState<TaxExemptionReason | null>(null);
    const [customerSelected, setCustomerSelected] = useState<Customer | null>(
        null
    );
    const [paymentTermSelected, setPaymentTermSelected] =
        useState<PaymentTerm | null>(null);
    const [lines, setLines] = useState<InvoiceLine[]>([]);
    const setDraftAction = useCallback(() => {
        setDraft(true);
        // handleSubmit();
    }, []);
    const unsetDraftAction = useCallback(() => {
        setDraft(false);
        //handleSubmit();
    }, []);

    useEffect(() => {
        if (DRAFT != null) {
            console.log("VOU SUBMETER!!!!");
            handleSubmit();
            setDraft(null);
        }
    }, [DRAFT]);
    useEffect(() => {
        setOpenLoader(
            [
                invoiceLoading,
                taxesLoading,
                unitsLoading,
                customersLoading,
                paymentTermLoading,
                invoiceTypeLoading,
                paymentTermActiveLoading,
                articlesLoading,
                addLoading,
                updateLoading,
            ].some(Boolean)
        );
    }, [
        invoiceLoading,
        taxesLoading,
        unitsLoading,
        customersLoading,
        paymentTermLoading,
        invoiceTypeLoading,
        paymentTermActiveLoading,
        articlesLoading,
        addLoading,
        updateLoading,
    ]);

    useEffect(() => {
        if (Number(props.paramsId) == 0) {
            if (paymentTermSelected) {
                var Days = paymentTermSelected.days;
                if (date && paymentTermSelected.days!==null) {
                    let newDate = new Date();
                    newDate.setDate(date.getDate() + Days);
                    setDueDate(newDate);
                } else {
                    setDueDate(null);
                }
            } else {
                if (paymentTermSelected) {
                    setDueDate(null);
                }
            }
        }
    }, [paymentTermSelected]);

    const SERVER_URL = process.env.REACT_APP_SERVER;
    const { t } = useTranslation();
    const token = localStorage.getItem("userToken");

    const submit = (rowIndex: number) => {
        confirmAlert({
            title: t("mainpage.common.deleteTitle"),
            message: t("mainpage.common.deleteText"),
            buttons: [
                {
                    label: t("mainpage.common.yes"),
                    onClick: () => {
                        console.log("Lines before");
                        console.log(lines);
                        const data = [...lines];
                        data.splice(rowIndex, 1);
                        setLines(data);
                        console.log("Lines after");
                        console.log(data);
                    },
                },
                {
                    label: t("mainpage.common.no"),
                    onClick: () => { },
                },
            ],
        });
    };
    const history = useHistory();
    const [openLoader, setOpenLoader] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [invoiceType, setInvoiceType] = useState<InvoiceTypes>([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const loadCustomers = () => {
        dispatch(
            getCustomers({
                onFailure: onFailure(history),
            })
        );
    };
    const importDocument = async (documentId: any) => {
        await fetch(`${SERVER_URL}/document/${documentId}/${token}`)
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 403) {
                    localStorage.clear();
                    history.push("/");
                } else {
                    const data = [...lines];
                    data.push({
                        article: "",
                        description:
                            result.documentType +
                            " de dia " +
                            result.date.toString().substr(0, 10),
                        quantity: 0,
                        unitPrice: 0,
                        discount: 0,
                        reference: "",
                        total: 0,
                    });
                    data.push({
                        article: "",
                        description: "",
                        quantity: 0,
                        unitPrice: 0,
                        discount: 0,
                        reference: "",
                        total: 0,
                    });
                    result.lines.forEach(function (l: any) {
                        data.push({
                            article: l.articleID,
                            description: l.description,
                            quantity: l.quantity,
                            unitPrice: l.unitPrice,
                            discount: l.discount,
                            reference: l.reference,
                            total: l.total,
                            documentLineId: l.id,
                            taxId: l.taxId,
                            unitId: l.unitID,
                            tax: l.tax,
                            unit: l.unit,
                        });
                    });
                    setLines(data);
                }
            });
    };
    const loadInvoiceType = async () => {
        let result = invoiceTypes;
        if (Number(props.paramsId2) > 0) {
            result = result.filter((s) => s.id == Number(props.paramsId2));
        } else {
            if (Number(props.paramsId) === 0) {
                result = result.filter((s) => s.canCreateAdHoc === true);
            }
        }
        setInvoiceType(result);
    };
    useEffect(() => {
        if (Number(props.paramsId) === 0) {
            setPaymentTerms(paymentTermActive);
        } else {
            setPaymentTerms(paymentTerms);
        }
    }, [props.paramsId, paymentTermActive, paymentTerms]);

    const loadArticles = async () => {
        dispatch(
            getArticles({
                onFailure: onFailure(history),
            })
        );
    };
    /* Load invoice Type*/
    useEffect(() => {
        loadInvoiceType();
        loadCustomers();
        loadArticles();
    }, []);
    useEffect(() => {
        loadInvoiceById();
    }, [props.paramsId, props.paramsId3]);
    useEffect(() => {
        console.log("WAHATT::");
        console.log(invoiceTypeSelected);
        if (invoiceTypeSelected != null) {
            if (invoiceTypeSelected.hasPaymentTerms == true) {
                setShowDueDate(true);
            } else {
                setShowDueDate(false);
            }
        } else {
            setShowDueDate(false);
        }
    }, [invoiceTypeSelected]);
    const handleSubmit = async () => {
        console.log("INVOICE DRAFT?" + DRAFT);
        // if (!DRAFT) {
        if (invoiceTypeSelected == null) {
            toast.error("Erro. Sem type de factura");
            return;
        }
        if (customerSelected == null) {
            toast.error("Erro. Sem cliente de factura");
            return;
        }
        if (paymentTermSelected == null) {
            toast.error("Erro. Sem acordo de pagamento");
            return;
        }
        //   }
        const sendData: InvoiceRequest = {
            InvoiceTypeID: invoiceTypeSelected.id,
            Lines: lines,
            CustomerID: customerSelected.id,
            PaymentTermID: paymentTermSelected.id,
            Date: date,
            OriginalInvoiceID: props.paramsId3 != null ? Number(props.paramsId3) : 0,
            DueDate: dueDate,
            TaxExemptionReasonID:
                taxExemptionReasonSelected != null
                    ? taxExemptionReasonSelected.taxExemptionReasonID
                    : null,
        };
        const mLink = DRAFT ? "invoice/draft" : "invoice";
        if (Number(props.paramsId) > 0) {
            dispatch(
                updateInvoice(mLink, Number(props.paramsId), sendData, {
                    onSuccess: () => {
                        history.push("/home/invoices");
                        toast.success(
                            t("mainpage.side_menu.invoices") +
                            " " +
                            t("mainpage.common.updatedSuccessfully")
                        );
                    },
                    onFailure: onFailure(history),
                })
            );
        } else {
            dispatch(
                addInvoice(mLink, sendData, {
                    onSuccess: () => {
                        toast.success(
                            t("mainpage.side_menu.invoices") +
                            " " +
                            t("mainpage.common.addedSuccessfully")
                        );
                        history.push("/home/invoices");
                    },
                    onFailure: onFailure(history),
                })
            );
        }
    };
    useEffect(() => {
        if (paymentTerm.length && invoice) {
            
            setPaymentTermSelected(
                paymentTerm?.find((e) => e.id == invoice.paymentTermID) || null
            );
        }
    }, [paymentTerm, invoice]);
    useEffect(() => {
        if (invoice) {
            setDate(new Date(invoice.date));
            setDueDate(new Date(invoice.dueDate));
            setLines(invoice.lines);
            if (!(Number(props.paramsId3) > 0)) {
                setReadOnly(invoice.readOnly);
            } else {
                setReadOnly(false);
            }
        } else {
            setDate(new Date());
            setDueDate(null);
            setLines([]);
            setReadOnly(false);
        }
    }, [invoice, props.paramsId3]);
    useEffect(() => {
        if (invoice && !paymentTermLoading) {
            setPaymentTermSelected(
                paymentTerm.find((e) => e.id == invoice.paymentTermID) || null
            );
        } else {
            setPaymentTermSelected(null);
        }
    }, [invoice, paymentTerm]);
    useEffect(() => {
        if (invoice && !taxExemptionReasonLoading) {
            setTaxExemptionReasonSelected(
                taxExemptionReason.find(
                    (e) => e.taxExemptionReasonID == invoice.taxExemptionReasonID
                ) || null
            );
        } else {
            setTaxExemptionReasonSelected(null);
        }
    }, [invoice, taxExemptionReason]);
    useEffect(() => {
        if (invoice && !customersLoading) {
            setCustomerSelected(
                customers?.find((e) => e.id == invoice.customerID) || null
            );
        } else {
            setCustomerSelected(null);
        }
    }, [invoice, customers]);

    useEffect(() => {
        if (invoice && invoiceTypes.length) {
            if (Number(props.paramsId3) > 0) {
                setInvoiceTypeSelected(
                    invoiceTypes.find((e) => e.id === Number(props.paramsId2)) || null
                );
                setInvoiceType(
                    invoiceTypes.filter((e) => e.id === Number(props.paramsId2))
                );
            } else {
                setInvoiceNumber(invoice.invoiceNumber);
                console.log(invoice.invoiceTypeID);
                setInvoiceTypeSelected(
                    invoiceTypes.find((e) => e.id === invoice.invoiceTypeID) || null
                );
                setInvoiceType(
                    invoiceTypes.filter(
                        (s) => s.canCreateAdHoc === true || s.id == invoice.invoiceTypeID
                    )
                );
            }
        } else {
            setInvoiceTypeSelected(null);
        }
    }, [invoice, props.paramsId2, props.paramsId3, invoiceTypes]);
    const handleInvoiceSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        handleSubmit();
    };
    const loadInvoiceById = async () => {
        dispatch(
            getInvoice(
                props.paramsId === "0"
                    ? Number(props.paramsId3)
                    : Number(props.paramsId),
                {
                    onFailure: onFailure(history),
                }
            )
        );
    };
    const [gridRef, setGridRef] = useState<MutableRefObject<any | null> | null>(
        null
    );
    const cellDOMProps = (cellProps: any) => {
        return {
            onClick: () => {
                gridRef?.current?.startEdit({
                    columnId: cellProps.id,
                    rowIndex: cellProps.rowIndex,
                });
            },
        };
    };
    const currency = (v: number) => {
        const str = ("" + v)
            .split("")
            .reverse()
            .map((c, i) => {
                if (i && i % 3 === 0) {
                    return c;
                }
                return c;
            })
            .reverse()
            .join("");
        return str + " €";
    };
    const number = (v: number) => {
        const str = ("" + v)
            .split("")
            .reverse()
            .map((c, i) => {
                if (i && i % 3 === 0) {
                    return c;
                }
                return c;
            })
            .reverse()
            .join("");
        return str;
    };
    const perc = (v: number) => {
        const str = ("" + v)
            .split("")
            .reverse()
            .map((c, i) => {
                if (i && i % 3 === 0) {
                    return c;
                }
                return c;
            })
            .reverse()
            .join("");
        return str + " %";
    };
    const columns = [
        {
            name: "id",
            header: "Id",
            defaultVisible: false,
            minWidth: 100,
            type: "number",
            cellDOMProps,
        },
        {
            name: "documentLineId",
            header: "documentLineId",
            visible: false,
            defaultVisible: false,
            minWidth: 100,
            type: "number",
            cellDOMProps,
        },
        {
            name: "reference",
            header: t("mainpage.common.reference"),
            editable: false,
            defaultFlex: 1,
            render: ({
                params,
                rowIndex,
                value,
            }: {
                params: any;
                rowIndex: number;
                value: any;
            }) => (
                <AutoComplete<Article>
                    options={articles || []}
                    getOptionLabel={(option) => option.reference}
                    {...params}
                    onChange={(event, value: Article) => {
                        const data = [...lines];
                        console.log("ONCHANGE!!!", value);
                        if (value != null /* Values might be null when filtering*/) {
                            data[rowIndex]["description"] = value.description;
                            data[rowIndex]["reference"] = value.reference;
                            data[rowIndex]["tax"] = "";
                            data[rowIndex]["taxId"] = 0;
                            data[rowIndex]["discount"] = 0;
                            data[rowIndex]["unitId"] = null;
                            data[rowIndex]["unit"] = "";
                            data[rowIndex]["documentLineId"] = undefined;
                            setLines(data);
                        }
                    }}
                    renderOption={(option: any, { selected }) => (
                        <>
                            {option.reference}-{option.description}
                        </>
                    )}
                    renderInput={(params) => {
                        // console.log(params.inputProps)
                        return (
                            <div ref={params.InputProps.ref}>
                                <input
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "0px",
                                        outline: "none",
                                    }}
                                    type="text"
                                    {...params.inputProps}
                                    value={lines[rowIndex]?.reference}
                                />
                            </div>
                        );
                    }}
                />
            ),
        },
        {
            name: "description",
            header: t("mainpage.common.description"),
            defaultFlex: 1,
            cellDOMProps,
        },
        {
            name: "quantity",
            header: t("mainpage.common.quantity"),
            type: "number",
            editor: NumericEditor,
            render: ({ value }: any) => number(value),
            defaultFlex: 1,
            cellDOMProps,
        },
        {
            name: "unit",
            header: t("mainpage.common.unit"),
            editable: false,
            type: "number",
            cellDOMProps,
            render: ({
                params,
                rowIndex,
                value,
            }: {
                params: any;
                rowIndex: number;
                value: Unit;
            }) => (
                <AutoComplete<Unit>
                    options={units}
                    getOptionLabel={(option) => option.name}
                    {...params}
                    onChange={(event: any, v: Unit) => {
                        const data = [...lines];
                        console.log("ONCHANGE!!!");
                        if (v != null /* Values might be null when filtering*/) {
                            data[rowIndex]["unit"] = v.name;
                            data[rowIndex]["unitId"] = v.id;
                            setLines(data);
                        }
                    }}
                    renderOption={(option, { selected }) => option.name}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input
                                style={{
                                    width: "100%",
                                    background: "transparent",
                                    border: "0px",
                                    outline: "none",
                                }}
                                type="text"
                                {...params.inputProps}
                                value={lines[rowIndex]?.unit}
                            />
                        </div>
                    )}
                />
            ),
        },
        {
            name: "unitPrice",
            header: t("mainpage.common.unitPrice"),
            type: "number",
            render: ({ value }: any) => currency(Number(value)),
            cellDOMProps,
        },
        {
            name: "tax",
            header: t("mainpage.common.tax"),
            editable: false,
            type: "number",
            cellDOMProps,
            render: ({
                params,
                rowIndex,
                value,
            }: {
                params: any;
                rowIndex: number;
                value: any;
            }) => (
                <AutoComplete<Tax>
                    options={taxes}
                    getOptionLabel={(option) => option.name}
                    {...params}
                    onChange={(event: any, v: Tax) => {
                        const data = [...lines];
                        console.log("ONCHANGE!!!");
                        if (v != null /* Values might be null when filtering*/) {
                            data[rowIndex]["tax"] = v.name;
                            data[rowIndex]["taxId"] = v.id;
                            setLines(data);
                        }
                        console.log("DATA: ", data);
                    }}
                    renderOption={(option) => option.name}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input
                                style={{
                                    width: "100%",
                                    background: "transparent",
                                    border: "0px",
                                    outline: "none",
                                }}
                                type="text"
                                {...params.inputProps}
                                value={lines[rowIndex]?.tax}
                            />
                        </div>
                    )}
                />
            ),
        },
        {
            name: "discount",
            header: t("mainpage.common.discount"),
            type: "number",
            render: ({ value }: any) => perc(value),
            cellDOMProps,
        },
        {
            name: "total",
            header: t("mainpage.common.total"),
            type: "number",
            render: ({ value }: any) => currency(value),
            cellDOMProps,
            editable: false,
        },
        {
            name: "delete",
            header: "",
            editable: false,
            visible: !readOnly,
            width: 20,
            render: ({ params, rowIndex }: { params: any; rowIndex: number }) => (
                <DeleteIcon
                    onClick={(e: any) => {
                        submit(rowIndex);
                    }}
                />
            ),
        },
    ];

    const onEditComplete = useCallback(
        ({ value, columnId, rowIndex }) => {
            const data = [...lines];
            data[rowIndex][columnId] = value;
            data[rowIndex]["total"] =
                Number(data[rowIndex]["unitPrice"]) *
                (data?.[rowIndex]?.["quantity"] || 0);
            data[rowIndex]["total"] =
                (data[rowIndex]?.["total"] || 0) *
                (1 - (data[rowIndex]?.["discount"] || 0) / 100);
            data[rowIndex]["unitPrice"] = Number(data[rowIndex]["unitPrice"]);
            data[rowIndex]["discount"] = Number(data[rowIndex]["discount"]);
            setLines(data);
        },
        [lines]
    );

    const handleInvoiceTypeChange = (_event: any, value: InvoiceType | null) => {
        setInvoiceTypeSelected(value);
    };
    const handletaxExemptionReasonChange = (
        event: any,
        value: TaxExemptionReason | null
    ) => {
        setTaxExemptionReasonSelected(value);
    };
    const handleCustomerChange = (event: any, value: Customer | null) =>
        setCustomerSelected(value);
    const handlePaymentTermChange = (event: any, value: PaymentTerm | null) =>
        setPaymentTermSelected(value);

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [dueDate, setDueDate] = React.useState<Date | null>(null);
    const [invoiceNumber, setInvoiceNumber] = React.useState("");
    const gridStyle = { minHeight: 300, fontSize: 12 };
    const getCellActions = (column: any, row: any) => {
        const cellActions = [
            {
                icon: <span className="fas fa-trash-alt a" />,
                callback: () => {
                    const rows = [...lines];
                    rows.splice(row.index, 1);
                    // eslint-disable-next-line
                    // lines.setState({ rows: rows });
                },
            },
        ];
        return column.key === "X" ? cellActions : null;
    };
    const summaryReducer = {
        initialValue: 0,
        reducer: (accumulator: any, item: any) => accumulator + (item.total || 0),
    };
    const footerRows = [
        {
            render: {
                total: ({ summary }: any) => (
                    <div>
                        Total : <b>{summary} €</b>
                    </div>
                ),
            },
        },
    ];
    const footerCellStyle = {
        textOverflow: "ellipsis",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
    };

    const onRowReorder = useCallback(
        ({ data, dragRowIndex, insertRowIndex }) => {
            console.log("Reorder!!!");
            setLines(lines);
        },
        [lines]
    );

    return (
        <div style={{ padding: "10px" }}>
            <form className="update" onSubmit={(event) => handleInvoiceSubmit(event)}>
                <Backdrop className={classes.backdrop} open={openLoader}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Grid container spacing={3}>
                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link color="inherit" href="/home/invoices">
                                {t("mainpage.side_menu.invoices")}
                            </Link>
                            <Typography color="textPrimary">
                                {t("mainpage.common.new")}
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                        <Grid container spacing={1}>
                            {invoice &&
                                props.paramsId2 == undefined &&
                                (Number(props.paramsId) > 0 || Number(props.paramsId3) > 0) && (
                                    <Grid item xs={12} md={12} lg={6} xl={6}>
                                        {t("mainpage.common.invoiceNumber")}

                                        <TextField
                                            type="text"
                                            disabled={true}
                                            value={invoiceNumber}
                                            style={{ width: "100%", marginTop: "6px" }}
                                            variant="outlined"
                                            inputProps={{ disableUnderline: true }}
                                        />
                                    </Grid>
                                )}
                            {(!invoice || props.paramsId2 != undefined) && (
                                <Grid item xs={12} md={12} lg={6} xl={6}></Grid>
                            )}
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.invoiceType")}

                                <AutoComplete<InvoiceType>
                                    id="invoiceTypeSelect"
                                    value={invoiceTypeSelected || null}
                                    options={invoiceType}
                                    disabled={readOnly}
                                    onChange={handleInvoiceTypeChange}
                                    style={{ width: "100%", marginTop: "6px" }}
                                    getOptionLabel={(option) => option.description}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.customer")}

                                <AutoComplete<Customer>
                                    id="customerSelect"
                                    options={customers}
                                    disabled={readOnly}
                                    value={customerSelected || null}
                                    onChange={handleCustomerChange}
                                    style={{ width: "100%", marginTop: "6px" }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.invoiceDate")}

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        disabled={readOnly}
                                        style={{ width: "100%", marginTop: "6px" }}
                                        value={date}
                                        format="yyyy-MM-dd"
                                        InputAdornmentProps={{ position: "start" }}
                                        onChange={setDate}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            {showDueDate ? (
                                <Grid item xs={12} md={12} lg={6} xl={6}>
                                    {t("mainpage.common.paymentTerm")}
                                    <AutoComplete<PaymentTerm>
                                        id="paymentTermSelect"
                                        options={paymentTerm}
                                        disabled={readOnly}
                                        value={paymentTermSelected || null}
                                        onChange={handlePaymentTermChange}
                                        style={{ width: "100%", marginTop: "6px" }}
                                        getOptionLabel={(option) => option.description}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" />
                                        )}
                                    />
                                </Grid>
                            ) : (
                                    ""
                                )}
                            {showDueDate ? (
                                <Grid item xs={12} md={12} lg={6} xl={6}>
                                    {t("mainpage.common.dueDate")}

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            disabled={readOnly}
                                            style={{ width: "100%", marginTop: "6px" }}
                                            value={dueDate}
                                            format="yyyy-MM-dd"
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={setDueDate}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            ) : (
                                    ""
                                )}
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.taxExemptionReason")}

                                <AutoComplete<TaxExemptionReason>
                                    id="taxExemptionReasonSelect"
                                    options={taxExemptionReason}
                                    disabled={readOnly}
                                    value={taxExemptionReasonSelected || null}
                                    onChange={handletaxExemptionReasonChange}
                                    style={{ width: "100%", marginTop: "6px" }}
                                    getOptionLabel={(option) => option.description}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                            style={{
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "end",
                                marginTop: "10px",
                            }}
                        >
                            {!readOnly && props.paramsId3 == null ? (
                                <Button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        setLines([
                                            ...lines,
                                            {
                                                article: "",
                                                description: "",
                                                quantity: 0,
                                                unitPrice: 0,
                                                discount: 0,
                                                reference: "",
                                                total: 0,
                                            },
                                        ]);
                                    }}
                                >
                                    {t("mainpage.common.addRow")}
                                </Button>
                            ) : (
                                    ""
                                )}
                        </Grid>
                        <ReactDataGrid
                            idProperty="id"
                            style={gridStyle}
                            onReady={setGridRef}
                            onEditComplete={onEditComplete}
                            editable={true}
                            emptyText={t("mainpage.common.noRecords")}
                            columns={columns}
                            dataSource={lines}
                            sortable={false}
                            footerRows={footerRows}
                            summaryReducer={summaryReducer}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                        <InvoiceSideMenu
                            readOnly={readOnly}
                            setDraft={setDraftAction}
                            unsetDraft={unsetDraftAction}
                            setOpenLoader={setOpenLoader}
                            invoice={invoice}
                            customerSelected={customerSelected}
                            importDocument={importDocument}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Invoice;
