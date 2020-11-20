import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  email:string;
  hospitalData;
  hospitalItems;
  currentCapacity: Number;


  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController
  ) {
    firebase.default.auth().onAuthStateChanged(data => {
      this.email = data.email;
      this.getHospitalData().subscribe(hdata => {
        this.hospitalData = hdata[0].items
        this.hospitalItems = Object.keys(this.hospitalData)
        this.currentCapacity = hdata[0].capacity.current
      })
    })
   }

  ngOnInit() {
  }

  checkIfLess(hospitalItem) {
    let val = this.hospitalData[hospitalItem]
    if(val < this.currentCapacity) {
      return true
    }  else {
      return false
    }
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  getHospitalData() {
    let options = {
      headers: {
        'email': this.email
      }
    }
    return this.http.get(`https://sahyog-app.arhaanb.co/api/user`, options);
  }
  returnHospitalItem(hospitalItem){
    let x = hospitalItem;
     if(x == 'oxygenCylinder')
     { 
       return 'Oxygen Cylinder'
     }
     if(x == 'pulseOximeters')
     {
         return 'Pulse Oximeters'
     }
     if(x == 'bloodPressureMonitors')
     {
        return 'Blood Pressure Monitors'
     }
     else
     { 
       return x
     }
  
  }
}
