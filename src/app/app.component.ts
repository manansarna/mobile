import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { ToastController,AlertController,LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public afauth:AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {

    firebase.default.initializeApp(environment.firebaseConfig)
    this.presentLoading();
    firebase.default.auth().onAuthStateChanged(async (user) => {
      if(user && user.uid) {
        this.router.navigateByUrl('/tabs')
        this.presentToast("successfully logged in");
      } else {
        this.router.navigateByUrl('/login')
      }
    })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async presentToast(message1: string) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 2000
    });
    toast.present();
  }
}
