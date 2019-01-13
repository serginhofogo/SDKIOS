import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ProductsService } from '../../app/services/services';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  txtype = true;

  createSuccess = false;
  registerCredentials = {email: '', password: ''};
  registerForm: any;

  constructor(private nav: NavController,
    private productService:ProductsService, 
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  goback() {
    this.nav.pop();
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public loginUser(credentials) {
    //check Login
    this.productService.loginUser(credentials).subscribe(
      res =>{
        var response = res;
        console.log(response.token);
        console.log(response.message);
        if(response.message = "Auth successful"){
          console.log("Login OK");
          this.nav.setRoot(TabsPage);
          this.productService.saveCredentials(credentials.email,response.token);
        }else{
          console.log("Usuario/Password Incorrecto");
          this.showPopup("Error", "Usuario/Password Incorrecto.");
        }
      },
      err => {
        console.log(err.message);
        console.log("Usuario/Password Incorrecto");
        this.showPopup("Error", "Usuario/Password Incorrecto.");
      }
  );

  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  show(){
    console.log("validar: ");
    if(this.txtype){
      this.txtype = false;
    }else{
      this.txtype = true;
    }
    
    
  }
}
