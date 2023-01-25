import {Component, OnInit} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';


import {DataprocesingService} from "../../../services/dataprocesing.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  data: string[] = ["Conti Correnti", "_Portafoglio", "_Anticipi", "_Libretti", "_Finanziamenti"];

  Data_list: Map<any, any>[];

  faStar = faStar;

  dropdownList = [{item_id: 1, item_text: "test"}];

  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
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
    this.activeAccordion = [];

    let datas: any;
    datas = new DataprocesingService();
    this.dropdownList = datas.dropdownList;
    this.Data_list = datas.Data_List;


  }


}
