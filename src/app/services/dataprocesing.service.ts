import {Injectable} from '@angular/core';
import all from "../views/base/tables/accounts.json";


@Injectable({
  providedIn: 'root'
})
export class DataprocesingService {
  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }

  get itemsShow(): string[] {
    return this._itemsShow;
  }

  set itemsShow(value: string[]) {
    this._itemsShow = value;
  }

  private _categories: string[] = ["Conti Correnti", "Portafoglio Incassi", "Libretti di risparmio",
    "Conti Anticipi Esteri", "Finanziamenti"];
  private _Data_List: Map<any, any>[];
  private _dropdownList: { item_id: number; item_text: string }[];
  private _dropdownTipology: { item_id: number; item_text: string }[] = [];
  private _Iban: string[];
  private _Intestazione: string[];
  private _Azienda: string[];
  private _data: string[]
  private _itemsShow: string[];

  check(array: Map<any, any>[], iban: string, type: string): boolean {

    for (const value1 of array) {
      if (value1.get("iban") === iban && value1.get("Name") === type) {
        return false;
      }
    }
    return true;
  }

  get_datas_from_json(): void {

    let aux = (all as Object);
    let aux2 = JSON.stringify(aux)
    let datas = JSON.parse(aux2);

    //Iterate through the json
    for (const companies of datas.companies) {
      for (const functions of companies.functions) {
        for (const accounts of functions.accounts) {
          for (const types of accounts["types"]) {

            // Declare Data_map as a Map
            let Data_map = new Map<string, string>();

            let name: string;
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
              name = "Conti Correnti"

            } else if (Types === "05") {

              name = "Portafoglio Incassi"

            } else if (Types === "18") {

              name = "Conti Anticipi Esteri";

            } else if (Types === "04") {

              name = "Libretti di risparmio";
            } else {

              name = "Finanziamenti";
            }

            // Insert data to map
            Data_map.set("Name", name);
            Data_map.set("Steluza", steluta);
            Data_map.set("iban", Iban);
            Data_map.set("intestazione", Intestazione);
            Data_map.set("azienda", Azienda);
            Data_map.set("alias", Alias);
            Data_map.set("devisa", Devisa);
            Data_map.set("abi_code", Bank);
            Data_map.set("types", Types);


            // Check if the data is already in the list and add them
            if (this.check(this._Data_List, Iban, name)) {

              this._Data_List.push(Data_map);
              if (Iban === "IT78Z0608547300000000022720") {
                console.log(this._Data_List)
              }
            }

          }
        }
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
    this._itemsShow = [];
    for (const value1 of value) {
      this._itemsShow.push(value1.item_text)
    }
  }


  constructor() {
    this._Data_List = [];
    this._Iban = [];
    this._Intestazione = [];
    this._Azienda = [];
    this._dropdownList = [];
    this._data = [];
    this._itemsShow = this._Intestazione;
    this.createTipology(this._categories);
    this.get_datas_from_json()
    //console.log(this._Intestazione)
    this.dropdownListSet(this._Intestazione);
    this.setData(this._dropdownTipology);
  }

  createTipology(tipology: string[]): void {
    let aux = 1
    for (const value of tipology) {
      this._dropdownTipology.push({'item_id': aux, 'item_text': value})
      aux++
    }
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
