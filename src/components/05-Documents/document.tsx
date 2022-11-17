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
    Checkbox,
    Paper,
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
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "@inovua/reactdatagrid-community/index.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import DocumentSideMenu from "./documentsidemenu";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../store/actions/CustomerActions";
import {
    DocumentType,
    PaymentTerm,
    PaymentTerms,
    TaxExemptionReason,
    Tax,
    Unit,
} from "../../store/types/DataTypes";
import { Article } from "../../store/types/ArticleTypes";
import { Customer } from "../../store/types/CustomerTypes";
import { getArticles } from "../../store/actions/ArticleActions";
import { History } from "history";
import { onFailure } from "../helper/onFailure";
import {
    addDocument,
    getDocument,
    updateDocument,
} from "../../store/actions/DocumentActions";
import { DocumentLine, DocumentRequest } from "../../store/types/DocumentTypes";

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

const Document = (props: any) => {
    const [DRAFT, setDraft] = useState<any>(null);
    const { data: documentType = [], loading: documentTypeLoading } =
        useAppSelector((state) => state.documentTypes);
    const { data: customers = [], loading: customersLoading } = useAppSelector(
        (state) => state.customers
    );
    const { data: articles = [], loading: articlesLoading } = useAppSelector(
        (state) => state.articles
    );
    const { data: paymentTerms = [], loading: paymentTermsLoading } =
        useAppSelector((state) => state.paymentTerms);
    const { data: taxExemptionReason = [], loading: taxExemptionReasonLoading } =
        useAppSelector((state) => state.taxExemptionReasons);
    const { data: tax = [], loading: taxLoading } = useAppSelector(
        (state) => state.taxes
    );
    const { data: unit = [], loading: unitsLoading } = useAppSelector(
        (state) => state.units
    );
    const { data: document, loading: documentLoading } = useAppSelector(
        (state) => state.document
    );
    const { data: paymentTermsActive = [], loading: paymentTermsActiveLoading } =
        useAppSelector((state) => state.paymentTermsActive);
    const { loading: addLoading } = useAppSelector((state) => state.addDocument);
    const { loading: updateLoading } = useAppSelector((s) => s.updateDocument);
    const dispatch = useDispatch();
    const [documentTypeSelected, setDocumentTypeSelected] =
        useState<DocumentType | null>(null);
    const [taxExemptionReasonSelected, setTaxExemptionReasonSelected] =
        useState<TaxExemptionReason | null>(null);
    const [customerSelected, setCustomerSelected] = useState<Customer | null>(
        null
    );
    const [paymentTerm, setPaymentTerm] = useState<PaymentTerms>([]);
    const [paymentTermSelected, setPaymentTermSelected] =
        useState<PaymentTerm | null>(null);
    const [lines, setLines] = useState<DocumentLine[]>([]);
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
            handleSubmit();
            setDraft(null);
        }
    }, [DRAFT]);
    useEffect(() => {
        setOpenLoader(
            [
                documentTypeLoading,
                customersLoading,
                articlesLoading,
                paymentTermsLoading,
                taxLoading,
                unitsLoading,
                documentLoading,
                paymentTermsActiveLoading,
                addLoading,
                updateLoading,
            ].some(Boolean)
        );
    }, [
        documentTypeLoading,
        customersLoading,
        articlesLoading,
        paymentTermsLoading,
        taxLoading,
        unitsLoading,
        documentLoading,
        paymentTermsActiveLoading,
        addLoading,
        updateLoading,
    ]);
    useEffect(() => {
        if (customerSelected?.paymentTermID && !paymentTermSelected) {
            setPaymentTermSelected(
                paymentTerm.find((e) => e.id == customerSelected.paymentTermID) || null
            );
        } else {
            setPaymentTermSelected(null);
        }
    }, [customerSelected]);
    useEffect(() => {
        if (document) {
            const res = document;
            setDate(new Date(res.date));
            setDocumentNumber(res.documentNumber);
            setDueDate(new Date(res.dueDate));
            setIsOpen(res.isOpen);
            setLines(res.lines);
            setReadOnly(res.readOnly);
        } else {
            setDate(new Date());
            setDocumentNumber("");
            setDueDate(null);
            setIsOpen(true);
            setLines([]);
            setReadOnly(false);
        }
    }, [document, props.paramsId]);
    useEffect(() => {
        if (document && customers.length > 0) {
            setCustomerSelected(
                customers?.find((e) => e.id == document.customerID) || null
            );
        } else {
            setCustomerSelected(null);
        }
    }, [document, customers, props.paramsId]);
    useEffect(() => {
        if (document && paymentTermsActive.length > 0) {
            
            setPaymentTermSelected(
                paymentTermsActive?.find((e) => e.id == document.paymentTermID) || null
            );
        } else {
            setPaymentTermSelected(null);
        }
    }, [document, paymentTerm, props.paramsId]);
    useEffect(() => {
        if (document && !taxExemptionReasonLoading) {
            setTaxExemptionReasonSelected(
                taxExemptionReason.find(
                    (e) => e.taxExemptionReasonID == document.taxExemptionReasonID
                ) || null
            );
        } else {
            setTaxExemptionReasonSelected(null);
        }
    }, [document, taxExemptionReason]);
    useEffect(() => {
        if (document && documentType.length > 0) {
            setDocumentTypeSelected(
                documentType.find((e) => e.id == document.documentTypeID) || null
            );
        } else {
            setDocumentTypeSelected(null);
        }
    }, [document, documentType, props.paramsId]);
    useEffect(() => {
        if (Number(props.paramsId) === 0) {
            if (paymentTermSelected) {
                var Days = paymentTermSelected.days;
                if (date && Days) {
                    let newDate = new Date();
                    newDate.setDate(date.getDate() + Days);
                    setDueDate(newDate);
                } else {
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
                        const data = [...lines];
                        data.splice(rowIndex, 1);
                        setLines(data);
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
    const classes = useStyles();
    const loadCustomers = async () => {
        dispatch(
            getCustomers({
                onFailure: onFailure(history),
            })
        );
    };
    useEffect(() => {
        if (Number(props.paramsId) === 0) {
            setPaymentTerm(paymentTermsActive);
        } else {
            setPaymentTerm(paymentTerms);
        }
    }, [paymentTerms, paymentTermsActive, props.paramsId]);
    const loadArticles = async () => {
        dispatch(
            getArticles({
                onFailure: onFailure(history),
            })
        );
    };

    useEffect(() => {
        loadCustomers();
        loadArticles();
        loadDocumentById();
    }, []);
    const closeDocument = async () => {
        await axios
            .put(SERVER_URL + `/document/${Number(props.paramsId)}/${token}`, {
                IsOpen: false,
            })
            .then((response) => {
                setTimeout(() => {
                    setOpenLoader(false);
                    history.push("/home/documents");
                }, 1000);
            });
    };
    const reopenDocument = async () => {
        await axios
            .put(SERVER_URL + `/document/${Number(props.paramsId)}/${token}`, {
                IsOpen: true,
            })
            .then((response) => {
                setTimeout(() => {
                    setOpenLoader(false);
                    history.push("/home/documents");
                }, 1000);
            });
    };
    const handleSubmit = async () => {
        // if (!DRAFT) {
        if (!documentTypeSelected) {
            toast.error("Erro. Sem type de factura");
            return;
        }
        if (!customerSelected) {
            toast.error("Erro. Sem cliente de factura");
            return;
        }
        if (!paymentTermSelected) {
            toast.error("Erro. Sem acordo de pagamento");
            return;
        }
        //   }
        const sendData: DocumentRequest = {
            DocumentTypeID: documentTypeSelected.id,
            Lines: lines,
            CustomerID: customerSelected.id,
            PaymentTermID: paymentTermSelected.id,
            Date: date,
            DueDate: dueDate,
            TaxExemptionReasonID:
                taxExemptionReasonSelected != null
                    ? taxExemptionReasonSelected.taxExemptionReasonID
                    : null,
        };
        const mLink = DRAFT ? "document/draft" : "document";
        if (props.paramsId != undefined && Number(props.paramsId) > 0) {
            dispatch(
                updateDocument(mLink, Number(props.paramsId), sendData, {
                    onFailure: onFailure(history),
                    onSuccess: () => {
                        toast.success(
                            t("mainpage.side_menu.documents") +
                            " " +
                            t("mainpage.common.updatedSuccessfully")
                        );
                    },
                })
            );
        } else {
            dispatch(
                addDocument(mLink, sendData, {
                    onFailure: onFailure(history),
                    onSuccess: () => {
                        toast.success(
                            t("mainpage.side_menu.documents") +
                            " " +
                            t("mainpage.common.addedSuccessfully")
                        );
                    },
                })
            );
        }
    };
    const handletaxExemptionReasonChange = (
        event: any,
        value: TaxExemptionReason | null
    ) => {
        setTaxExemptionReasonSelected(value);
    };
    const handleDocumentSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        handleSubmit();
    };
    const loadDocumentById = async () => {
        dispatch(
            getDocument(Number(props.paramsId), { onFailure: onFailure(history) })
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
    const currency = (v: any) => {
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
    const number = (v: any) => {
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
    const perc = (v: any) => {
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
            name: "reference",
            header: t("mainpage.common.reference"),
            editable: false,
            defaultFlex: 1,
            render: ({ params, rowIndex }: { params: any; rowIndex: number }) => (
                <AutoComplete<Article>
                    options={articles || []}
                    getOptionLabel={(option) => option.reference}
                    {...params}
                    onChange={(event, value: Article) => {
                        const data = [...lines];
                        if (value) {
                            data[rowIndex]["description"] = value.description;
                            data[rowIndex]["reference"] = value.reference;
                            data[rowIndex]["tax"] = "";
                            data[rowIndex]["taxId"] = 0;
                            data[rowIndex]["discount"] = 0;
                            data[rowIndex]["unitId"] = null;
                            data[rowIndex]["unit"] = "";
                            setLines(data);
                        }
                    }}
                    renderOption={(option) => (
                        <>
                            {option.reference}-{option.description}
                        </>
                    )}
                    renderInput={(params) => {
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
                value: any;
            }) => (
                <AutoComplete<Unit>
                    options={unit || []}
                    getOptionLabel={(option) => option.name}
                    {...params}
                    onChange={(event, v: Unit) => {
                        const data = [...lines];
                        if (v) {
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
                    options={tax || []}
                    getOptionLabel={(option) => option.name}
                    {...params}
                    onChange={(event, v: Tax) => {
                        const data = [...lines];
                        if (v != null /* Values might be null when filtering*/) {
                            data[rowIndex]["tax"] = v.name;
                            data[rowIndex]["taxId"] = v.id;
                            setLines(data);
                        }
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
            visible: !readOnly,
            editable: false,
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

    const handleDocumentTypeChange = (event: any, value: DocumentType | null) => {
        setDocumentTypeSelected(value);
    };
    const handleCustomerChange = (event: any, value: Customer | null) =>
        setCustomerSelected(value);
    const handlePaymentTermChange = (event: any, value: PaymentTerm | null) =>
        setPaymentTermSelected(value);

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [dueDate, setDueDate] = React.useState<Date | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [documentNumber, setDocumentNumber] = React.useState("");
    const gridStyle = { minHeight: 300, fontSize: 12 };
    const getCellActions = (column: any, row: any) => {
        const cellActions = [
            {
                icon: <span className="fas fa-trash-alt a" />,
                callback: () => {
                    const rows = [...lines];
                    rows.splice(row.index, 1); //
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
            setLines(lines);
        },
        [lines]
    );

    return (
        <div style={{ padding: "10px" }}>
            <Backdrop className={classes.backdrop} open={openLoader}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <form
                className="update"
                onSubmit={(event) => handleDocumentSubmit(event)}
            >
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12} className={classes.flexEnd}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link color="inherit" href="/home/documents">
                                {t("mainpage.side_menu.documents")}
                            </Link>
                            <Typography color="textPrimary">
                                {t("mainpage.common.new")}
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                        <Grid container spacing={1}>
                            {document && (
                                <Grid item xs={12} md={12} lg={6} xl={6}>
                                    {t("mainpage.common.documentNumber")}

                                    <TextField
                                        type="text"
                                        disabled={true}
                                        value={documentNumber}
                                        style={{ width: "100%", marginTop: "6px" }}
                                        variant="outlined"
                                        inputProps={{ disableUnderline: true }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.documentType")}

                                <AutoComplete<DocumentType>
                                    id="documentTypeSelect"
                                    value={documentTypeSelected || null}
                                    options={documentType || []}
                                    disabled={readOnly}
                                    onChange={handleDocumentTypeChange}
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
                                    options={customers || []}
                                    disabled={readOnly}
                                    value={customerSelected}
                                    onChange={handleCustomerChange}
                                    style={{ width: "100%", marginTop: "6px" }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.documentDate")}

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
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                {t("mainpage.common.paymentTerm")}

                                <AutoComplete<PaymentTerm>
                                    id="paymentTermSelect"
                                    options={paymentTerm || []}
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
                        <Grid item md={12} xs={12}>
                            {t("mainpage.common.documentOpen")}
                        </Grid>
                        <Grid item md={12} xs={12} style={{ margin: "10px 0" }}>
                            <Checkbox
                                id="active"
                                disabled={true}
                                checked={isOpen != null ? isOpen : false}
                                name="active"
                                inputProps={{ "aria-label": "Checkbox A" }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                            style={{
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "end",
                            }}
                        >
                            {!readOnly ? (
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
                        <DocumentSideMenu
                            readOnly={readOnly}
                            setDraft={setDraftAction}
                            unsetDraft={unsetDraftAction}
                            documentArg={document}
                            isOpen={isOpen}
                            reopenDocument={reopenDocument}
                            closeDocument={closeDocument}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Document;
