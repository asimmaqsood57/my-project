import { Action, Callbacks, State } from ".";
import { SaftType, TaxLine } from "./DataTypes";

export interface DocumentRequest {
    DocumentTypeID: number;
    Lines: DocumentLine[];
    CustomerID: number;
    PaymentTermID: number;
    Date: Date | null;
    DueDate: Date | null;
    TaxExemptionReasonID: number;
}

export interface DocumentRaw {
    customerName: string;
    date: string;
    documentNumber: string;
    documentType: string;
    id: number;
    isOpen: boolean;
    totalTax: number;
    totalValue: number;
}

export interface DocumentLine {
    id?: number;
    originalDocumentLineID?: number;
    documentID?: number;
    articleID?: number;
    reference?: string;
    description?: string;
    quantity?: number;
    unitPrice?: number;
    discount?: number;
    tax?: string;
    taxCode?: string;
    taxValue?: number;
    totalTaxValue?: number;
    taxBase?: number;
    total?: number;
    taxId?: number;
    lOrder?: number;
    unit?: string;
    unitID?: number;
    documentLineId?: number;
    [key: string]: any;
}

export interface Document {
    atcud: null | string;
    companyAddress: string;
    companyCity: string;
    companyName: string;
    companyPostalCode: string;
    companyVATNumber: string;
    creationDate: string;
    creationUser: number;
    currency: null | string;
    customerAddress: string;
    customerID: number;
    customerName: string;
    customerNumber: number;
    customerPostalCode: null | string;
    customerVATNumber: string;
    date: string;
    documentNumber: string;
    documentType: string;
    documentTypeID: number;
    dueDate: string;
    externalNumber: null | string;
    hash: string;
    id: number;
    isOpen: boolean;
    lines: DocumentLine[];
    number: number;
    paymentTermID: number;
    qrcode: string;
    readOnly: boolean;
    saft: SaftType;
    shortHash: string;
    taxExemptionCode: null | string;
    taxExemptionReason: null | string;
    taxExemptionReasonID: null | number;
    taxLines: TaxLine[];
    totalEuro: number;
    totalExternalCoin: number;
    totalTax: number;
    totalWithoutTax: number;
}

export type DocumentAction = Action<Document>;
export type DocumentState = State<Document>;
export type DocumentCallbacks = Callbacks<Document>;

export type Documents = DocumentRaw[];
export type DocumentsAction = Action<Documents>;
export type DocumentsState = State<Documents>;
export type DocumentsCallbacks = Callbacks<Documents>;