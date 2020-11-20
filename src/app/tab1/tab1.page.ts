import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from '../notifications/notifications.page';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  currentCapacity: Number;
  maxCapacity: Number;
  masks: Number;
  gloves: Number;
  suits: Number;
  ventilators: Number;
  oxygenCylinder: Number;
  beds: Number;
  drugs: Number;
  pulseOximeters: Number;
  bloodPressureMonitors: Number;
  email:string;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController,
    public router:Router,
    public toastController:ToastController
  ) {
    firebase.default.auth().onAuthStateChanged(user => {
      this.email = user.email
      this.getHospitalData().subscribe(data => {
        this.currentCapacity = data[0].capacity.current || 0
        this.maxCapacity = data[0].capacity.total || 0
        this.beds = data[0].items.beds || 0
        this.bloodPressureMonitors = data[0].items.bloodPressureMonitors || 0
        this.drugs = data[0].items.drugs || 0
        this.gloves = data[0].items.gloves || 0
        this.masks = data[0].items.masks || 0
        this.oxygenCylinder = data[0].items.oxygenCylinder || 0
        this.pulseOximeters = data[0].items.pulseOximeters || 0
        this.suits = data[0].items.suits || 0
        this.ventilators = data[0].items.ventilators || 0
      })
    })
  }
  
  ngOnInit() {
    this.platform.backButton.observers.pop();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationsPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  updateHospitalData() {
    let options = {
      headers: {
        'email': this.email, 
      }
    }
    let postData = {
      current: this.currentCapacity,
      max: this.maxCapacity,
      beds: this.beds,
      bloodPressureMonitors: this.bloodPressureMonitors,
      drugs: this.drugs,
      gloves: this.gloves,
      masks: this.masks,
      oxygenCylinder: this.oxygenCylinder,
      pulseOximeters: this.pulseOximeters,
      suits: this.suits,
      ventilators: this.ventilators,
    }
    this.http.post('https://sahyog-app.arhaanb.co/api/set', postData, {...options,responseType: 'text'}).subscribe(data => {
      console.log(data)
    })
  }

  getHospitalData() {
    let options = {
      headers: {
        'email': this.email
      }
    }
    return this.http.get(`https://sahyog-app.arhaanb.co/api/user`, options);
  }

  async logout(){  
    await this.afauth.signOut();
    await this.router.navigateByUrl('/login');
    await this.presentToast("you are logged out");
  }
  
  async presentToast(message1: string) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 2000
    });
    toast.present();
  }
}
