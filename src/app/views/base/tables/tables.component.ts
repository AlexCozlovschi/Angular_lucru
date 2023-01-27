import {Component, OnInit} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

import {DataprocesingService} from "../../../services/dataprocesing.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  data: string[];
  alias: string = "";
  iban: string = "";
  items: string[] = ['A.C. FILATURA _23', 'A.C. FILATURA NORDMSK', 'A.C. FILATURA2 NORDMSK'];
  datas = new DataprocesingService();
  dropdownTipology = [{item_id: 1, item_text: "test"}];
  Data_list: Map<any, any>[];
  faChec = faChevronDown;
  faStar = faStar;

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
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };


  tipologiChange() {
    this.datas.setData(this.selectedTipology);
    this.ngOnInit();
  }


  itemChange() {
    this.datas.setItem(this.selectedItems);
    console.log(this.selectedItems)
    this.items = this.datas.items;
    this.ngOnInit();

  }

  aliasFilter(text: any) {
    if (text.data == null) {
      this.alias = this.alias.slice(0, -1);
    } else {
      this.alias += text.data
    }
    console.log(this.alias);
  }

  ibanFilter(text: any) {
    if (text.data == null) {
      this.iban = this.iban.slice(0, -1);
    } else {
      this.iban += text.data
    }
    console.log(this.iban);
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

    this.activeAccordion = ["Conti Correnti"];
    this.dropdownList = this.datas.dropdownList;
    this.Data_list = this.datas.Data_List;
    this.data = this.datas.data;

    this.dropdownTipology = this.datas.dropdownTipology;
  }

  ngOnInit(): void {
    this.activeAccordion = ["Conti Correnti"];

    console.log(this.items)
    this.dropdownList = this.datas.dropdownList;
    this.selectedItems = this.dropdownList;
    this.Data_list = this.datas.Data_List;
    this.data = this.datas.data;
    this.dropdownTipology = this.datas.dropdownTipology;

  }


}
