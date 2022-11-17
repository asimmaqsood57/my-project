import { Action, Callbacks, State } from ".";
import { SaftType, TaxLine } from "./DataTypes";

export interface InvoiceRaw {
    creationDate: string;
    customerName: string;
    date: string;
    id: number;
    invoiceNumber: string;
    invoiceType: string;
    totalTax: number;
    totalValue: number;
}

export interface InvoiceLine {
    id?: number;
    originalInvoiceLineID?: number;
    invoiceID?: number;
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

export interface Invoice {
    id: number;
    number: number;
    invoiceNumber: string;
    externalNumber: string | null;
    date: string;
    draft: boolean;
    dueDate: string;
    invoiceTypeID: number;
    paymentTermID: number;
    invoiceType: string;
    companyName: string;
    companyVATNumber: string;
    companyAddress: string;
    companyCity: string;
    companyPostalCode: string;
    typeDescription: string | null;
    customerCountry: string | null;
    customerID: number;
    customerNumber: number;
    customerName: string;
    customerAddress: string;
    customerPostalCode: string | null;
    customerVATNumber: string;
    totalEuro: number;
    totalWithoutTax: number;
    totalExternalCoin: number;
    totalTax: number;
    currency: string | null;
    creationUser: number;
    creationDate: string;
    lines: InvoiceLine[];
    taxLines: TaxLine[];
    hash: string;
    shortHash: string;
    saft: SaftType;
    readOnly: boolean;
    qrcode: string;
    atcud: string | null;
    canceled: boolean;
    taxExemptionReason: string | null;
    taxExemptionCode: string | null;
    taxExemptionReasonID: number | null;
    originalInvoiceID: number;
    originalReference: string|null;
}


export interface InvoiceRequest {
    InvoiceTypeID: number;
    Lines: InvoiceLine[];
    CustomerID: number;
    PaymentTermID: number;
    Date: Date | null;
    DueDate: Date | null;
    TaxExemptionReasonID: number;
    OriginalInvoiceID: number;
}


export type InvoiceAction = Action<Invoice>;
export type InvoiceState = State<Invoice>;
export type InvoiceCallbacks = Callbacks<Invoice>;

export type Invoices = InvoiceRaw[];
export type InvoicesAction = Action<Invoices>;
export type InvoicesState = State<Invoices>;
export type InvoicesCallbacks = Callbacks<Invoices>;