/**
 * id: 2
settingDateValue: null
settingIntValue: null
settingName: "Company Name"
settingStringValue: "FLOWIT LDA"
 */

import { Action, Callbacks, State } from ".";

export interface Company {
  id: number;
  settingDateValue: null;
  settingIntValue: null;
  settingName: string;
  settingStringValue: string;
}

export type CompanyAction = Action<Company>;
export type CompanyState = State<Company>;
export type CompanyCallbacks = Callbacks<Company>;