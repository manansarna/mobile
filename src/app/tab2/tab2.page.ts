import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from '../notifications/notifications.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  email: string;
  description: string;
  problem: string;
  lat:number= 51.678418;
  lng:number= 7.809007;
  lat1:number= 52.678418;
  lng1:number= 7.809007;

  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController,
    ) {
      
    }
  ngOnInit(){
    firebase.default.auth().onAuthStateChanged(async user => {
        this.email = user.email
      })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationsPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
  
  sendRequest() {
    let options = {
      headers: {
        'email': this.email, 
      } 
    }
    let postData = {
      request: this.problem,
      dsc: this.description
    }
    this.http.post('https://sahyog-app.arhaanb.co/api/request', postData, {...options,responseType: 'text'}).subscribe(data => {
      console.log(data)
    })
  }
  deleteRequest(){
    let options = {
      headers: {
        'email': this.email, 
      } 
    }
    let postData = {
      
    }
    // /api/del-request
    this.http.post('https://sahyog-app.arhaanb.co/api/del-request', postData, {...options,responseType: 'text'}).subscribe(data => {
      console.log(data)
    })
  }
}
