import {Component, OnInit} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FilterService} from "../../../services/filter.service";
import {JsonDService} from "../../../services/json-d.service";

import {DataprocesingService} from "../../../services/dataprocesing.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  datas = new DataprocesingService();
  data: string[] = this.datas.data;
  Data_list: Map<any, any>[] = this.datas.Data_List;
  dropdownTipology = [{item_id: 1, item_text: "test"}];
  dropdownList = [{item_id: 1, item_text: "test"}];
  selectedTipology = [
    {item_id: 1, item_text: 'Conti Correnti'},
    {item_id: 2, item_text: 'Portafoglio Incassi'},
    {item_id: 3, item_text: 'Conti Anticipi Esteri'},
    {item_id: 4, item_text: 'Libretti di risparmio'},
    {item_id: 5, item_text: 'Finanziamenti'}];
  selectedItems = [{item_id: 1, item_text: 'A.C. FILATURA _23'},
    {item_id: 2, item_text: "A.C. FILATURA NORDMSK"},
    {item_id: 3, item_text: "A.C. FILATURA2 NORDMSK"},];
  items: string[] = this.datas.itemsShow;
  alias: string = "";
  iban_alias: string = "";

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  faChec = faChevronDown;
  faStar = faStar;

  tipologiFilter() {
    this.datas.setData(this.selectedTipology);
    this.ngOnInit();
  }


  itemChange() {
    this.datas.setItem(this.selectedItems);
    console.log(this.selectedItems)
    this.items = this.datas.itemsShow;
    this.ngOnInit();

  }


  textFilter(text: any) {
    if (text.data == null) {
      this.iban_alias = this.iban_alias.slice(0, -1);
    } else {
      this.iban_alias += text.data
    }
    console.log(this.iban_alias);

  }


  activeAccordion: any;


  toggleAccordion(name: any) {
    if (this.activeAccordion.includes(name)) {
      this.activeAccordion.splice(this.activeAccordion.indexOf(name), 1);
    } else {
      this.activeAccordion.push(name);
    }
  }

  constructor() {
    const js = new JsonDService();
    js.iterate();

  }

  ngOnInit(): void {
    this.activeAccordion = ["Conti Correnti", "Portafoglio Incassi", " Libretti di risparmio",
      "Conti Anticipi Esteri", "Libretti di risparmio", " Finanziamenti"];
    this.dropdownList = this.datas.dropdownList;
    this.selectedItems = this.dropdownList;
    this.Data_list = this.datas.Data_List;
    this.data = this.datas.data;
    this.dropdownTipology = this.datas.dropdownTipology;

  }


}
