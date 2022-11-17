import { Action, Callbacks, State } from ".";

export interface CustomerRequest {
  Name: string;
  VATNumber: string;
  Address: string;
  PaymentTermID: number | null;
}

export interface Customer {
  address: string;
  countryID: number;
  creationDate: string;
  creationUser: number;
  id: number;
  name: string;
  number: number;
  paymentTermID: number | null;
  postalCode: string | null;
  vatNumber: string;
}

export type CustomerAction = Action<Customer>;
export type CustomerState = State<Customer>;
export type CustomerCallbacks = Callbacks<Customer>;

export type Customers = Customer[];
export type CustomersAction = Action<Customers>;
export type CustomersState = State<Customers>;
export type CustomersCallbacks = Callbacks<Customers>;
