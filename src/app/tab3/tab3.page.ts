import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from '../notifications/notifications.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  allHospData;
  ref: boolean = false;
  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController
  ) {
    this.getAllHospitalData().subscribe(data => {
      this.allHospData = data
      console.log(this.allHospData)
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

  getAllHospitalData() {
    let options = {
      headers: {
        // 'email': this.email, 
      }
    }
    return this.http.get(`https://sahyog-app.arhaanb.co/api/hospitals`, options);
  }

  check(item) {
    if (item.status.requested == 1) {
      return true
    }
    else {
      return false
    }
  }
}
