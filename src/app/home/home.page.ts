import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { StateApp } from '../core/services/state.service';
import { UserInterface } from '../core/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  dataGnrl: UserInterface[];
  dataGrid: UserInterface[];
  search: string;
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private state: StateApp
  ) {}

  initData(){
    this.storage.init();
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData(){
    this.dataGnrl = this.storage.getData("BD");
    this.dataGrid = Object.assign([], this.dataGnrl);
  }

  searchData(){
    if(this.search != ""){
      this.dataGrid = this.dataGrid.filter((data: UserInterface)=>{
        return data.name.toLowerCase().includes(this.search.toLowerCase());
      });
    } else {
      this.dataGrid = this.dataGrid = Object.assign([], this.dataGnrl);
    }
  }

  manageData(item?){
    this.state.setData({comment: item, dataGnrl: this.dataGnrl});
    this.router.navigate(["comments"]);
  }

}
