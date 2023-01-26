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
  selectedItems = [];
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


  onItemSelect(item: any) {
    this.datas.setData(this.selectedTipology);
    console.log(item);
    this.ngOnInit();
  }

  onSelectAll(items: any) {
    console.log(this.selectedTipology);
    this.datas.setData(this.selectedTipology);
    this.ngOnInit();
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

    this.dropdownList = this.datas.dropdownList;
    this.Data_list = this.datas.Data_List;
    this.data = this.datas.data;
    this.dropdownTipology = this.datas.dropdownTipology;

  }


}
