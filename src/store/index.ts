import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as todoReducers from "./reducers/TodoReducers";
import * as userReducers from "./reducers/UserReducers";
import * as invoiceReducers from "./reducers/InvoiceReducers";
import * as customersReducers from "./reducers/CustomerReducers";
import * as dataReducers from "./reducers/DataReducers";
import * as articleReducers from "./reducers/ArticleReducers";
import * as documentReducers from "./reducers/DocumentReducers";
import * as companyReducers from "./reducers/CompanyReducers";

const initialState = {};

const reducer = combineReducers({
    login: userReducers.loginReducer,
    recover: userReducers.recoverReducer,
    users: userReducers.getUsersReducer,
    todos: todoReducers.getTodosReducer,
    updateUser: userReducers.updateUserReducer,
    addUser: userReducers.addUserReducer,
    user: userReducers.getUserReducer,

    addTodo: todoReducers.addTodoReducer,
    deleteTodo: todoReducers.deleteTodoReducer,
    invoices: invoiceReducers.getInvoicesReducer,
    invoice: invoiceReducers.getInvoiceReducer,
    addInvoice: invoiceReducers.addInvoiceReducer,
    updateInvoice: invoiceReducers.updateInvoiceReducer,
    deleteInvoice: invoiceReducers.deleteInvoiceReducer,
    customers: customersReducers.getCustomersReducer,
    customer: customersReducers.getCustomerReducer,
    deleteCustomer: customersReducers.deleteCustomerReducer,
    addCustomer: customersReducers.addCustomerReducer,
    updateCustomer: customersReducers.updateCustomerReducer,
    paymentTerms: dataReducers.getPaymentTermsReducer,
    addPaymentTerm: dataReducers.addPaymentTermReducer,
    updatePaymentTerm: dataReducers.updatePaymentTermReducer,
    paymentTerm: dataReducers.getPaymentTermReducer,
    paymentTermsActive: dataReducers.getPaymentTermsActiveReducer,
    documentTypes: dataReducers.getDocumentTypesReducer,
    invoiceTypes: dataReducers.getInvoiceTypesReducer,
    invoiceType: dataReducers.getInvoiceTypeReducer,
    addInvoiceType: dataReducers.addInvoiceTypeReducer,
    updateInvoiceType: dataReducers.updateInvoiceTypeReducer,
    taxes: dataReducers.getTaxesReducer,
    units: dataReducers.getUnitsReducer,
    saftTypes: dataReducers.getSaftProductTypesReducer,
    taxExemptionReasons: dataReducers.getTaxExemptionReasonsReducer,
    articles: articleReducers.getArticlesReducer,
    addArticle: articleReducers.addArticleReducer,
    deleteArticle: articleReducers.deleteArticleReducer,
    updateArticle: articleReducers.updateArticleReducer,
    article: articleReducers.getArticleReducer,
    documents: documentReducers.getDocumentsReducer,
    document: documentReducers.getDocumentReducer,
    deleteDocument: documentReducers.deleteDocumentReducer,
    updateDocument: documentReducers.updateDocumentReducer,
    addDocument: documentReducers.addDocumentReducer,
    vatNumber: companyReducers.getVatNumberReducer,
    companyName: companyReducers.getCompanyNameReducer,
    companyShareCapital: companyReducers.getCompanyShareCapitalReducer,
    companyAddress: companyReducers.getCompanyAddressReducer,
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch