declare module namespace {

  export interface Limits {
    monthly: number;
    daily: number;
    operation?: any;
  }

  export interface Limits2 {
    monthly?: any;
    daily?: any;
    operation?: any;
  }

  export interface Type {
    status: string;
    type: string;
    alias?: any;
    is_passive_bank: boolean;
    currency?: any;
    account_naming: string;
    is_default_account?: any;
    tax_code: string;
  }

  export interface Limits3 {
    monthly?: any;
    daily?: any;
    operation?: any;
  }

  export interface RoleAccount {
    iban: string;
    permission: string;
    limits: Limits3;
  }

  export interface Account {
    company_id: string;
    iban: string;
    types: Type[];
    roleAccount: RoleAccount;
  }

  export interface Function {
    function_code: string;
    permission_type: string;
    permission: string;
    limits: Limits2;
    additionalAttributes: any[];
    accounts: Account[];
    max_permission: string;
  }

  export interface Company {
    nickname?: any;
    defaultPermissionForNewAccount: string;
    defaultPermissionForNewFunction: string;
    limits: Limits;
    company_id: string;
    abi_code: string;
    cab_code: string;
    cuc_code: string;
    tax_code: string;
    product_code: string;
    sia_code: string;
    company_name: string;
    functions: Function[];
    charge_account: string;
    ndg_code: string;
    creditor_id?: any;
    status: string;
    full_address: string;
    allow_update_ceilings: boolean;
  }

  export interface RootObject {
    user_id: string;
    uid: string;
    company_id: string;
    surname: string;
    name: string;
    ndg_code: string;
    email: string;
    phone_number: string;
    tax_code: string;
    nickname?: any;
    type: string;
    ndg_locked: boolean;
    token_serial_number?: any;
    language: string;
    role_type: string;
    companies: Company[];
  }

}
