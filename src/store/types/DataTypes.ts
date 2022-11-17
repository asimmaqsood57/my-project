import { type } from "os";
import { Action, Callbacks, State } from ".";

export interface PaymentTerm {
    active: boolean;
    days: number;
    description: string;
    id: number;
}

export interface PaymentTermRequest {
    Active: boolean;
    Days: number;
    Description: string;
}

export type PaymentTermAction = Action<PaymentTerm>;
export type PaymentTermState = State<PaymentTerm>;
export type PaymentTermCallbacks = Callbacks<PaymentTerm>;

export type PaymentTerms = PaymentTerm[];
export type PaymentTermsAction = Action<PaymentTerms>;
export type PaymentTermsState = State<PaymentTerms>;
export type PaymentTermsCallbacks = Callbacks<PaymentTerms>;

export interface InvoiceType {
    description: string;
    id: number;
    saftType: SaftType;
    creationUser: number | null;
    creationDate: string;
    includeInSAFT: boolean;
    active: boolean;
    canCreateAdHoc: boolean | number;
    hasPaymentTerms: boolean | number;
}
export type InvoiceTypeAction = Action<InvoiceType>;
export type InvoiceTypeState = State<InvoiceType>;
export type InvoiceTypeCallbacks = Callbacks<InvoiceType>;

export type InvoiceTypes = InvoiceType[];
export type InvoiceTypesAction = Action<InvoiceTypes>;
export type InvoiceTypesState = State<InvoiceTypes>;
export type InvoiceTypesCallbacks = Callbacks<InvoiceTypes>;

export interface Unit {
    description: string;
    id: number;
    name: string;
}
export type Units = Unit[];
export type UnitAction = Action<Units>;
export type UnitState = State<Units>;
export type UnitCallbacks = Callbacks<Units>;

export interface Tax {
    id: number;
    name: string;
    taxCode: string;
    value: number;
}
export type Taxes = Tax[];
export type TaxAction = Action<Taxes>;
export type TaxState = State<Taxes>;
export type TaxCallbacks = Callbacks<Taxes>;

export interface TaxExemptionReason {
    description: string;
    saftCode: string;
    taxExemptionReasonID: number;
}
export type TaxExemptionReasons = TaxExemptionReason[];
export type TaxExemptionReasonAction = Action<TaxExemptionReasons>;
export type TaxExemptionReasonState = State<TaxExemptionReasons>;
export type TaxExemptionReasonCallbacks = Callbacks<TaxExemptionReasons>;

export interface SaftType {
    description: string;
    id: number;
    saftCode: string;
    debit?: boolean;
    credit?: boolean;
}
export type SaftTypes = SaftType[];
export type SaftTypeAction = Action<SaftTypes>;
export type SaftTypeState = State<SaftTypes>;
export type SaftTypeCallbacks = Callbacks<SaftTypes>;

export interface DocumentType {
    creationDate: string;
    creationUser: number | null;
    description: string;
    id: number;
    includeInSAFT: boolean;
    saftType: SaftType;
    active?: boolean;
}
export type DocumentTypeAction = Action<DocumentType>;
export type DocumentTypeState = State<DocumentType>;
export type DocumentTypeCallbacks = Callbacks<DocumentType>;

export type DocumentTypes = DocumentType[];
export type DocumentTypesAction = Action<DocumentTypes>;
export type DocumentTypesState = State<DocumentTypes>;
export type DocumentTypesCallbacks = Callbacks<DocumentTypes>;

export interface TaxLine {
    taxID: number;
    taxValue: number;
    totalTaxValue: number;
    taxBase: number;
}
