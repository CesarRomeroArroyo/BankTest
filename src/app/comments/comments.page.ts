import { Component, OnInit } from '@angular/core';
import { StateApp } from '../core/services/state.service';
import { UserInterface } from '../core/models/user.interface';
import { LocalStorageService } from '../core/services/local-storage.service';
import { UniqueService } from '../core/services/unique.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  title: string = "";
  edit: boolean = false;
  user: UserInterface;
  dataGnrl: UserInterface[];
  constructor(
    private state: StateApp,
    private storage: LocalStorageService,
    private unique: UniqueService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.state.getObservable().subscribe((data) => {
      this.dataGnrl = data.dataGnrl;
      if(data.comment){
        this.title = "Edición de comentarios";
        this.edit = true;
        this.user = data.comment;
      } else {
        this.title = "Creación de comentarios";
        this.user = {id: "", name:"", email:"", website:"", comment:""}
      }
    });
  }

  async setData(){
    if(this.user.id==""){
      this.user.id = this.unique.uniqueId();
      this.dataGnrl.push(this.user);
    } else {
      this.dataGnrl = this.dataGnrl.filter((data) => {
        return data.id !== this.user.id;
      });
      this.dataGnrl.push(this.user);
    }
    this.storage.setData('BD', this.dataGnrl);
    const toast = await this.toastController.create({
      message: 'Data Salvada.',
      duration: 2000
    });
    toast.present();
  }

}
