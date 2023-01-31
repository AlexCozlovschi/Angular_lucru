import {Injectable} from '@angular/core';
import {JsonSerializer, throwError} from 'typescript-json-serializer';
import all from "../views/base/tables/accounts.json";

@Injectable({
  providedIn: 'root'
})
export class JsonDService {
  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    this._items = value;
  }

  private _Data_List: Map<any, any>[];
  private _dropdownList: { item_id: number; item_text: string }[];
  private _dropdownTipology: { item_id: number; item_text: string }[];
  private _Iban: string[];
  private _Intestazione: string[];
  private _Azienda: string[];
  private _data: string[]
  private _items: string[] = ['A.C. FILATURA _23', 'A.C. FILATURA NORDMSK', 'A.C. FILATURA2 NORDMSK'];

  check(array: Map<any, any>[], iban: string, type: string): boolean {

    for (const value1 of array) {
      if (value1.get("iban") === iban && value1.get("types") === type) {
        return false;
      }
    }
    return true;
  }

  iterate(): void {
    let aux = (all as Object);
    let aux2 = JSON.stringify(aux)
    let datas = JSON.parse(aux2);

    //Iterate through the json
    for (const companies of datas.companies) {
      for (const functions of companies.functions) {
        for (const accounts of functions.accounts) {
          for (const types of accounts.types) {
            // Declare Data_map as a Map
            let Data_map = new Map<string, string>();

            // Parse all data from json
            let Iban = accounts.iban;
            let steluta = types.is_default_account;
            let Intestazione = types.account_naming;
            let Azienda = companies.company_name;
            let Bank = companies.abi_code;
            let Alias = types.alias;
            let Id_comp = accounts.company_id;
            let Types = types.type;
            let Status = types.status;
            let Currency = types.currency;
            let Tax_code = types.tax_code;
            let Devisa = types.currency;

            // Check the null values
            if (Devisa === null) {
              Devisa = "EUR"
            }
            if (Alias === null) {
              Alias = Id_comp
            }

            // Prepare data for filter
            if (!this._Intestazione.includes(Intestazione)) {
              this._Intestazione.push(Intestazione);
            }

            if (!this._Azienda.includes(Azienda)) {
              this._Azienda.push(Azienda);
            }

            // Filter data by types
            if (Types === "01") {
              Data_map.set("Name", "Conti Correnti");

            } else if (Types === "05") {
              Data_map.set("Name", "Portafoglio Incassi");


            } else if (Types === "18") {
              Data_map.set("Name", "Conti Anticipi Esteri");

            } else if (Types === "04") {
              Data_map.set("Name", "Libretti di risparmio");
            } else {
              Data_map.set("Name", "Finanziamenti");
            }

            // Insert data to map
            Data_map.set("Steluza", steluta);
            Data_map.set("iban", Iban);
            Data_map.set("intestazione", Intestazione);
            Data_map.set("azienda", Azienda);
            Data_map.set("alias", Alias);
            Data_map.set("devisa", Devisa);
            Data_map.set("abi_code", Bank);
            Data_map.set("types", Types);


            // Check if the data is already in the list and add them
            if (this.check(this._Data_List, Iban, Types)) {
              this._Data_List.push(Data_map);
            }

          }
        }
      }

    }
  }

  get_datas_from_json(): void {

    let aux = (all as Object);
    let aux2 = JSON.stringify(aux)
    //console.log(aux2)
    let count = 0;
    let datas = JSON.parse(aux2);
    for (let i = 0; i < datas.companies[0].functions.length; i++) {
      try {

        let id = i;

        let Azienda = datas.companies[0].company_name;
        let Bank = datas.companies[0].abi_code;


        for (let j = 0; j < datas.companies[0].functions[i].accounts.length; j++) {
          let Data_map = new Map<string, string>();
          let Iban = datas.companies[0].functions[i].accounts[0].iban;
          let Id_comp = datas.companies[0].functions[i].accounts[0].company_id;
          let steluta = datas.companies[0].functions[i].accounts[0]["types"][0]["is_default_account"];
          let Intestazione = datas.companies[0].functions[i].accounts[0]["types"][0].account_naming
          let Alias = datas.companies[0].functions[i].accounts[0]["types"][0]["alias"];
          if (Alias === null) {
            Alias = Id_comp
          }
          let Devisa = datas.companies[0].functions[i].accounts[0]["types"][0]["currency"];
          if (Devisa === null) {
            Devisa = "EUR"
          }
          let Types = datas.companies[0].functions[i].accounts[0]["types"][0]["type"];
          Data_map.set("Steluza", steluta);
          Data_map.set("iban", Iban);
          Data_map.set("intestazione", Intestazione);
          Data_map.set("azienda", Azienda);
          Data_map.set("alias", Alias);
          Data_map.set("devisa", Devisa);
          Data_map.set("abi_code", Bank);
          Data_map.set("types", Types);

          if (!this._Intestazione.includes(Intestazione)) {
            this._Intestazione.push(Intestazione);
          }
          this._Iban.push(Iban);
          this._Azienda.push(Azienda);


        }
      } catch (e) {
        console.log(e)
      }
    }


  }

  dropdownListSet(value: string[]) {

    for (let i = 0; i < value.length; i++) {
      this._dropdownList.push({'item_id': i + 1, 'item_text': value[i]})
    }
  }

  setData(value: { item_id: number; item_text: string }[]) {
    this._data = [];
    for (const value1 of value) {
      this._data.push(value1.item_text)
    }
  }

  setItem(value: { item_id: number; item_text: string }[]) {
    this._items = [];
    for (const value1 of value) {
      this._items.push(value1.item_text)
    }
  }

  constructor() {
    this._Data_List = [];
    this._Iban = [];
    this._Intestazione = [];
    this._Azienda = [];
    this._dropdownList = [];
    this._data = [];
    this._items = [];
    this._dropdownTipology = [
      {item_id: 1, item_text: 'Conti Correnti'},
      {item_id: 2, item_text: 'Portafoglio Incassi'},
      {item_id: 3, item_text: 'Conti Anticipi Esteri'},
      {item_id: 4, item_text: 'Libretti di risparmio'},
      {item_id: 5, item_text: 'Finanziamenti'}];
    this.get_datas_from_json()
    //console.log(this._Intestazione)
    this.dropdownListSet(this._Intestazione);
    this.setData(this._dropdownTipology);
  }


  get dropdownTipology(): { item_id: number; item_text: string }[] {
    return this._dropdownTipology;
  }

  set dropdownTipology(value: { item_id: number; item_text: string }[]) {
    this._dropdownTipology = value;
  }

  get data(): string[] {
    return this._data;
  }

  set data(value: string[]) {
    this._data = value;
  }

  get Data_List(): Map<any, any>[] {
    return this._Data_List;
  }

  set Data_List(value: Map<any, any>[]) {
    this._Data_List = value;
  }

  get dropdownList(): { item_id: number; item_text: string }[] {
    return this._dropdownList;
  }

  set dropdownList(value: { item_id: number; item_text: string }[]) {
    this._dropdownList = value;
  }

  get Intestazione(): string[] {
    return this._Intestazione;
  }

  set Intestazione(value: string[]) {
    this._Intestazione = value;
  }


}
