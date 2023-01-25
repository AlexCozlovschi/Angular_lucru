import {Injectable} from '@angular/core';
import all from "../views/base/tables/accounts.json";
import {routerLinkWithHref} from "@angular/core/schematics/migrations/router-link-with-href/util";

@Injectable({
  providedIn: 'root'
})
export class DataprocesingService {
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


  private _Data_List: Map<any, any>[];

  private _dropdownList: { item_id: number; item_text: string }[];
  private _Iban: string[];
  private _Intestazione: string[];
  private _Azienda: string[];

  check(array: Map<any, any>[], iban: string, type: string): boolean {

    for (const value1 of array) {
      if (value1.get("iban") === iban && value1.get("types") === type) {
        return false;
      }
    }
    return true;
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
          let Devisa = datas.companies[0].functions[i].accounts[0]["types"][0]["currency"];
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


          switch (Types) {
            case "01":

              Data_map.set("Name", "Conti Correnti");

              break;
            case "05":
              Data_map.set("Name", "_Portafoglio");


              break
            case "18":
              Data_map.set("Name", "_Anticipi");

              break;
            case "04":
              Data_map.set("Name", "_Libretti");
              break;

            default:
              Data_map.set("Name", "_Finanziamenti");

          }
          if (this.check(this._Data_List, Iban, Types)) {
            this._Data_List.push(Data_map);
          }
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

  constructor() {
    this._Data_List = [];
    this._Iban = [];
    this._Intestazione = [];
    this._Azienda = [];
    this._dropdownList = [];
    this.get_datas_from_json()
    console.log(this._Intestazione)
    this.dropdownListSet(this._Intestazione);
  }
}
