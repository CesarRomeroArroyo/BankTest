import { Injectable } from '@angular/core';
import {UniqueService} from './unique.service';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private unique : UniqueService
  ) { }

  setData(name, data){
    localStorage.setItem(name, JSON.stringify(data));
  }

  getData(name){
    return JSON.parse(localStorage.getItem(name));
  }

  init(){
    const data: UserInterface[] = [
      {
        id: this.unique.uniqueId(),
        name: "Wilfredo Baez",
        email: "wbaez@gmail.com",
        website: "wwww.wilfredo.com",
        comment:''
      },
      {
        id: this.unique.uniqueId(),
        name: "Julio Perez",
        email: "julio@gmail.com",
        website: "wwww.jlio.com",
        comment:''
      },
      {
        id: this.unique.uniqueId(),
        name: "Amado Guzman",
        email: "wbaez@gmail.com",
        website: "wwww.wilfredo.com",
        comment:''
      }
    ];
    this.setData("BD",data);
  }
}
