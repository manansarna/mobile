import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController, AlertController ,MenuController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  constructor(
    public afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public router: Router,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public menu: MenuController
  ) { }

  ngOnInit() {
   
  }
  public checkRegister() {
    this.RegisterWithEmail();
}
ionViewDidEnter()
{
  this.menu.enable(false); 
}
public RegisterWithEmail() {
 
} 
 async login(){
  this.afauth.signInWithEmailAndPassword(
    this.email,
    this.password
  ).then(async (data)=>{
    console.log(data)
    this.presentToast("Logged in successfully")
    this.menu.enable(true); 
    this.router.navigateByUrl('/tabs', { replaceUrl: true })
  }).catch((err)=>{
    if (err.code == "auth/wrong-password") {
      this.presentToast("Username or Password Incorrect")
    }
    if (err.code == "auth/invalid-email") {
      this.presentToast("Invalid Email")
    }
    if (err.code == "auth/user-not-found") {
      this.presentToast("User not found, please register")
    }
    if (err.code == "auth/network-request-failed") {
      this.presentToast("Poor network")
    }
  });
 }
  async presentToast(message1: string) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
