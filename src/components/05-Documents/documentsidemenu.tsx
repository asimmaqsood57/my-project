import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useEffect } from "react";
import { useState } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Svg,
    Ellipse,
    Font,
    Path,
    Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "react-bootstrap";
import "simplebar/dist/simplebar.min.css";
import * as React from "react";
import SimpleBar from "simplebar-react";
import { Button, Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import Article from "../05-Article/article";
import { ReportViewerModule } from "ngx-ssrs-reportviewer";
import moment from "moment";
import QRCode from "qrcode";

Font.register({
    family: "Lato",
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});
Font.register({
    family: "Lato Bold",
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});
Font.register({
    family: "Ubunto",
    src: `https://fonts.gstatic.com/s/ubuntu/v9/7-wH0j2QCTHKgp7vLh9-sQ.ttf`,
});
Font.register({
    family: "Ubunto Bold",
    src: `https://fonts.gstatic.com/s/ubuntu/v9/bMbHEMwSUmkzcK2x_74QbA.ttf`,
});
const styles = StyleSheet.create({
    lines: {
        fontSize: 8,
        fontFamily: "Ubunto",
        height: 15,
    },
    hd: {
        height: 100,
    },
    hf: {
        height: 14,
        maxHeight: 14,
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderBottomColor: "#112131",
        borderBottomStyle: "solid",
    },
    lineBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        borderBottomStyle: "solid",
    },
    borderTop: {
        borderTopWidth: 2,
        borderTopColor: "#112131",
        borderTopStyle: "solid",
    },
    w25: {
        width: "25%",
    },
    w30: {
        width: "30%",
    },
    w35: {
        width: "35%",
    },
    w50: {
        width: "50%",
    },
    w100: {
        width: "100%",
    },
    mt4: {
        marginTop: 4,
    },
    qrcode: {
        width: 100,
        height: 100,
        margin: '0 auto'
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        height: 183,
        minHeight: 183,
        maxHeight: 183,
    },
    containerSmall: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 20,
    },
    taxLines: {
        flex: 1,
        flexDirection: "row",
        height: 18,
        maxHeight: 18,
    },
    containerLine: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 18,
        height: 18,
    },
    containerLines: {
        flex: 2,
        flexDirection: "column",
    },
    containerLinesWrapper: {
        flex: 3,
        flexDirection: "column",
    },
    viewLines: {
        flex: 4,
        flexDirection: "row",
        maxHeight: 15,
        minHeight: 15,
        backgroundColor: "#f8f8f8",
    },
    viewLinesFooter: {
        flex: 1,
        flexDirection: "row",
    },

    col1: {
        flex: 1,
        flexDirection: "column",
    },
    footerWrapper: {
        flex: 1,
        flexDirection: "column",

        /*maxHeight: '100%',*/
    },
    headerLines: {
        fontSize: 8,
        fontFamily: "Lato Bold",
        marginTop: 4,
    },

    headerNormal: {
        fontSize: 8,
        fontFamily: "Lato",
    },
    headerBold: {
        fontSize: 8,
        fontFamily: "Lato Bold",
    },
    pad10: {
        padding: 10,
    },
    pad40: {
        padding: 40,
    },
    rightColumn: {
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "flex-end",
        justifySelf: "flex-end",
    },
    leftColumn: {
        flexDirection: "column",
        width: 170,

        paddingRight: 15,
        "@media max-width: 400": {
            width: "100%",
            paddingRight: 0,
        },
        "@media orientation: landscape": {
            width: 200,
        },
    },
    footer: {
        fontSize: 12,

        textAlign: "center",
        marginTop: 15,
        paddingTop: 5,
        borderWidth: 3,
        borderColor: "gray",
        borderStyle: "dashed",
        "@media orientation: landscape": {
            marginTop: 10,
        },
    },
    page: {
        padding: 30,
        backgroundColor: "#ffffff",
        width: "595.28px",
    },
    col50: {
        width: "50%",
    },
    header: {
        width: "595.28px",
    },
    body: {
        width: "595.28px",
    },
    full: {
        width: 595.28,
    },
    border: {
        border: 1,
    },

    section: {
        margin: 0,

        border: 1,
        flexGrow: 1,
        fontSize: 8,
    },
    right: {
        textAlign: "right",
    },
    left: {
        textAlign: "left",
    },
});
const DocumentSideMenu = (props: any) => {
    const { t } = useTranslation();
    const readOnly = props.readOnly;
    const setDraft = props.setDraft;
    const documentArg = props.documentArg;
    const unsetDraft = props.unsetDraft;
    const closeDocument = props.closeDocument;
    const reopenDocument = props.reopenDocument;
    const isOpen = props.isOpen;
    const closePrint = () => {
        setShowPrint(false);
    };
    const canPrint = !readOnly;
    const canCreateCreditNote = !readOnly;
    const [userData, setUserData] = useState<any>(null);
    const [showModal, setState] = useState(false);
    const [showPrint, setShowPrint] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("userData") !== null) {
            let data = localStorage.getItem("userData");
            setUserData(data !== null ? JSON.parse(data) : null);
        }
    }, []);

    const handleCloseDocument = async () => {
        console.log("HANDLEDRAFT");
        closeDocument();
    };
    const handleReopenDocument = async () => {
        console.log("HANDLEDRAFT");
        reopenDocument();
    };
    const handleDraftSubmit = async () => {
        console.log("HANDLEDRAFT");
        setDraft();
    };

    const handleDocumentSubmit = async () => {
        console.log("HANDLEDocument");
        unsetDraft();
    };
    let canvas;
    // For QR Code
    canvas = document.createElement("canvas");

    if (documentArg !== undefined) {
        QRCode.toCanvas(
            canvas,
            documentArg != null ? documentArg.qrcode : "INVALID", { version: 9, errorCorrectionLevel: 'M' }
        );

    } else {
        QRCode.toCanvas(canvas, "INVALID", { version: 9, errorCorrectionLevel: 'M' });

    }
    const qr = canvas.toDataURL();


    return (
        <>
            <Grid item md={12} xs={12}>
                &nbsp;
      </Grid>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Button
                        type="button"
                        style={{ width: "100%" }}
                        variant="contained"
                        name="submit"
                        className="btn btn-dark float-left"
                        onClick={() => handleDocumentSubmit()}
                        disabled={readOnly}
                    >
                        {t("mainpage.common.saveFinish")}
                    </Button>
                </Grid>
                {/*<Grid item md={12} xs={12}>*/}
                {/*    <Button*/}
                {/*        type="button"*/}
                {/*        name="draft"*/}
                {/*        disabled={readOnly}*/}
                {/*        style={{ width: "100%" }}*/}
                {/*        variant="contained"*/}
                {/*        onClick={() => handleDraftSubmit()}*/}
                {/*        className="btn btn-link float-left"*/}
                {/*    >*/}
                {/*        {t("mainpage.common.saveDraft")}*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
                <Grid item md={12} xs={12}>
                    <Button
                        type="button"
                        style={{ width: "100%" }}
                        variant="contained"
                        name="print"
                        disabled={canPrint}
                        onClick={() => setShowPrint(true)}
                        className="btn btn-link float-left"
                    >
                        {t("mainpage.common.print")}
                    </Button>
                </Grid>

                <Grid item md={12} xs={12}>
                    <Button
                        type="button"
                        style={{ width: "100%" }}
                        variant="contained"
                        name="print"
                        onClick={() => setState(true)}
                        className="btn btn-link float-left"
                    >
                        {t("mainpage.common.newArticle")}
                    </Button>
                </Grid>
                {isOpen && readOnly && (
                    <Grid item md={12} xs={12}>
                        <Button
                            type="button"
                            style={{ width: "100%" }}
                            variant="contained"
                            name="closeDocument"
                            onClick={() => handleCloseDocument()}
                            className="btn btn-link float-left"
                        >
                            {t("mainpage.common.closeDocument")}
                        </Button>
                    </Grid>
                )}
                {!isOpen && readOnly && (
                    <Grid item md={12} xs={12}>
                        <Button
                            type="button"
                            style={{ width: "100%" }}
                            variant="contained"
                            name="reopenDocument"
                            onClick={() => handleReopenDocument()}
                            className="btn btn-link float-left"
                        >
                            {t("mainpage.common.reopenDocument")}
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>{t("mainpage.common.newArticle")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Article modal setShowModal={setState} />
                </Modal.Body>
            </Modal>

            <Modal show={showPrint} dialogClassName="modal-90w">
                <Modal.Header>
                    <Modal.Title>{t("mainpage.common.printpreview")}</Modal.Title>
                    <CloseButton onClick={closePrint} />
                </Modal.Header>
                <Modal.Body>
                    <PDFViewer height="800" width="567">
                        <Document producer="FLOW.ERP" creator="FLOW.ERP">
                            <Page size="A4" style={styles.page} debug={false} wrap>
                                <View
                                    style={{ ...styles.container }}
                                    debug={false}
                                    fixed={true}
                                >
                                    <View style={styles.leftColumn} debug={false}>
                                        <Svg viewBox="0 0 256 182" debug={false}>
                                            <Path
                                                d="M216.357806,174.771308 C255.135865,205.772152 279.979747,113.201688 218.194093,96.1350211 C166.345992,81.7687764 114.17384,106.396624 61.8936709,163.861603 C61.8936709,163.861603 158.460759,128.540084 216.357806,174.771308 Z"
                                                fill="#0B5567"
                                            ></Path>
                                            <Path
                                                d="M62.7578059,163.105485 C99.9156118,124.54346 161.701266,81.5527426 219.274262,97.4312236 C232.668354,101.211814 242.17384,108.98903 248.330802,118.278481 L193.890295,8.42531646 C186.11308,-3.99662447 166.237975,-1.40421941 155.004219,8.10126582 L11.1257384,128.648101 C-1.9443038,139.881857 -2.70042194,159.864979 9.39746835,171.962869 C20.0911392,182.65654 37.049789,183.628692 48.8236287,174.123207 L62.7578059,163.105485 Z"
                                                fill="#15A9CE"
                                            ></Path>
                                        </Svg>
                                        <Text debug={false} style={styles.headerBold}>
                                            &nbsp;
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            {documentArg != null ? documentArg.companyName : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerNormal}>
                                            {documentArg != null ? documentArg.companyAddress : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerNormal}>
                                            {documentArg != null ? documentArg.companyPostalCode : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerNormal}>
                                            {documentArg != null ? documentArg.companyCity : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerNormal}>
                                            {documentArg != null ? documentArg.companyVATNumber : ""}
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.rightColumn }} debug={false}>
                                        <Text debug={false} style={styles.headerBold}>
                                            Este documento não serve de fatura
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            &nbsp;
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            {documentArg != null ? documentArg.documentType : ""} :{" "}
                                            {documentArg != null ? documentArg.documentNumber : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerNormal}>
                                            Data :{" "}
                                            {documentArg != null
                                                ? moment(documentArg.date).format("DD-MM-YYYY")
                                                : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            &nbsp;
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            &nbsp;
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            &nbsp;
                    </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            {documentArg != null ? documentArg.customerName : ""}
                                        </Text>
                                        <Text debug={false} style={styles.headerBold}>
                                            {documentArg != null ? documentArg.customerAddress : ""}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ ...styles.containerSmall }}
                                    debug={false}
                                    fixed={true}
                                >
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerNormal,
                                            ...styles.mt4,
                                            ...styles.w25,
                                        }}
                                    >
                                        VAT:{" "}
                                        {documentArg != null ? documentArg.customerVATNumber : ""}
                                    </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerNormal,
                                            ...styles.mt4,
                                            ...styles.w25,
                                        }}
                                    ></Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerNormal,
                                            ...styles.mt4,
                                            ...styles.w25,
                                        }}
                                    ></Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerNormal,
                                            ...styles.mt4,
                                            ...styles.w25,
                                            ...styles.right,
                                        }}
                                    >
                                        Due Date:{" "}
                                        {documentArg != null
                                            ? moment(documentArg.dueDate).format("DD-MM-YYYY")
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={{ ...styles.containerSmall, ...styles.borderBottom }}
                                    debug={false}
                                    fixed={true}
                                >
                                    <Text
                                        style={{
                                            ...styles.headerNormal,
                                            ...styles.mt4,
                                            ...styles.w100,
                                            ...styles.right,
                                        }}
                                        render={({ pageNumber, totalPages }) =>
                                            `Pagina ${pageNumber} / ${totalPages}`
                                        }
                                        fixed
                                    />
                                </View>

                                <View
                                    style={{ ...styles.containerLine, ...styles.borderBottom }}
                                    debug={false}
                                    fixed={true}
                                >
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.left,
                                        }}
                                    >
                                        #
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "100%",
                                            ...styles.left,
                                        }}
                                    >
                                        Descri��o
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        Quantidade
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        Unidade
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        P.U.
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        IVA
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        Desconto
                  </Text>
                                    <Text
                                        debug={false}
                                        style={{
                                            ...styles.headerLines,
                                            width: "66px",
                                            ...styles.right,
                                        }}
                                    >
                                        Total
                  </Text>
                                </View>
                                <View style={{ ...styles.containerLinesWrapper }} debug={false}>
                                    <View style={{ ...styles.containerLines }} debug={false}>
                                        {new Array(1).fill(
                                            documentArg != null && documentArg.lines !== undefined
                                                ? documentArg.lines.map((item: any) => (
                                                    <View
                                                        style={{ ...styles.viewLines }}
                                                        debug={false}
                                                        wrap={false}
                                                        minPresenceAhead={200}
                                                    >
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.left,
                                                            }}
                                                        >
                                                            {item.reference}
                                                        </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "100%",
                                                                ...styles.left,
                                                            }}
                                                        >
                                                            {item.description}
                                                        </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.quantity}
                                                        </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.unit}
                                                        </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.unitPrice.toFixed(2)}&euro;
                              </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.taxValue * 100}%
                              </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.discount}%
                              </Text>
                                                        <Text
                                                            debug={false}
                                                            style={{
                                                                ...styles.lines,
                                                                width: "66px",
                                                                ...styles.right,
                                                            }}
                                                        >
                                                            {item.total}&euro;
                              </Text>
                                                    </View>
                                                ))
                                                : ""
                                        )}
                                    </View>
                                </View>
                                <View
                                    style={{ ...styles.footerWrapper, ...styles.borderTop }}
                                    debug={false}
                                    fixed={true}
                                >
                                    <View
                                        style={{ ...styles.viewLinesFooter, ...styles.hf }}
                                        debug={false}
                                    >
                                        <Text
                                            debug={false}
                                            style={{ ...styles.lines, width: "70%", ...styles.left }}
                                        >
                                            {documentArg != null ? documentArg.shortHash : ""}
                      -Processado por Programa Certificado n.o 9999/AT
                    </Text>
                                        <Text
                                            debug={false}
                                            style={{ ...styles.lines, width: "30%", ...styles.right }}
                                        >
                                            Total:{" "}
                                            {documentArg != null
                                                ? documentArg.totalWithoutTax.toFixed(2)
                                                : ""}{" "}
                      &euro;
                    </Text>
                                    </View>
                                    <View
                                        style={{ ...styles.viewLinesFooter, ...styles.hd }}
                                        fixed={true}
                                        debug={false}
                                    >
                                        <View
                                            style={{
                                                ...styles.col1,
                                                ...styles.w50,
                                                ...styles.left,
                                                ...styles.mt4,
                                            }}
                                            debug={false}
                                        >
                                            <Text style={{ ...styles.lines }}>
                                                Quadro resumo de IVA
                      </Text>
                                            <View
                                                style={{ ...styles.taxLines, ...styles.borderTop }}
                                                debug={false}
                                                wrap={false}
                                            >
                                                <Text
                                                    debug={false}
                                                    style={{
                                                        ...styles.lines,
                                                        ...styles.left,
                                                        ...styles.w30,
                                                    }}
                                                >
                                                    Taxa de IVA
                        </Text>
                                                <Text
                                                    debug={false}
                                                    style={{
                                                        ...styles.lines,
                                                        ...styles.right,
                                                        ...styles.w35,
                                                    }}
                                                >
                                                    Base Tributavel
                        </Text>
                                                <Text
                                                    debug={false}
                                                    style={{
                                                        ...styles.lines,
                                                        ...styles.right,
                                                        ...styles.w35,
                                                    }}
                                                >
                                                    TOTAL IVA
                        </Text>
                                            </View>
                                            {new Array(1).fill(
                                                documentArg != null && documentArg.lines !== undefined
                                                    ? documentArg.taxLines.map((item: any) => (
                                                        <View
                                                            style={{ ...styles.taxLines }}
                                                            debug={false}
                                                            wrap={false}
                                                        >
                                                            <Text
                                                                debug={false}
                                                                style={{
                                                                    ...styles.lines,
                                                                    ...styles.left,
                                                                    ...styles.w30,
                                                                }}
                                                            >
                                                                {item.taxValue}%
                                </Text>
                                                            <Text
                                                                debug={false}
                                                                style={{
                                                                    ...styles.lines,
                                                                    ...styles.right,
                                                                    ...styles.w35,
                                                                }}
                                                            >
                                                                {item.taxBase}&euro;
                                </Text>
                                                            <Text
                                                                debug={false}
                                                                style={{
                                                                    ...styles.lines,
                                                                    ...styles.right,
                                                                    ...styles.w35,
                                                                }}
                                                            >
                                                                {item.totalTaxValue}&euro;
                                </Text>
                                                        </View>
                                                    ))
                                                    : ""
                                            )}
                                        </View>

                                        <View
                                            style={{ ...styles.col1, ...styles.w25 }}
                                            debug={false}
                                        >
                                            <Image src={qr} style={styles.qrcode} debug={false} />
                                        </View>

                                        <View
                                            style={{
                                                ...styles.col1,
                                                ...styles.w25,
                                                borderBottom: 1,
                                                borderTop: 1,
                                            }}
                                        >
                                            <Text style={{ ...styles.lines, ...styles.right }}>
                                                &nbsp;
                      </Text>
                                            <Text
                                                debug={false}
                                                style={{
                                                    ...styles.lines,
                                                    ...styles.right,
                                                    ...styles.mt4,
                                                }}
                                            >
                                                {t("mainpage.common.total2")}:{" "}
                                                {documentArg != null
                                                    ? documentArg.totalWithoutTax.toFixed(2)
                                                    : ""}{" "}
                        &euro;
                      </Text>
                                            <Text
                                                debug={false}
                                                style={{ ...styles.lines, ...styles.right }}
                                            >
                                                {t("mainpage.common.totalVAT")}:{" "}
                                                {documentArg != null
                                                    ? documentArg.totalTax.toFixed(2)
                                                    : ""}{" "}
                        &euro;
                      </Text>
                                            <Text
                                                debug={false}
                                                style={{ ...styles.lines, ...styles.right }}
                                            >
                                                &nbsp;
                      </Text>
                                            <Text
                                                debug={false}
                                                style={{
                                                    ...styles.lines,
                                                    ...styles.right,
                                                    ...styles.headerBold,
                                                }}
                                            >
                                                {t("mainpage.common.totalEuro")}:{" "}
                                                {documentArg != null
                                                    ? documentArg.totalEuro.toFixed(2)
                                                    : ""}{" "}
                        &euro;
                      </Text>
                                        </View>
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DocumentSideMenu;
