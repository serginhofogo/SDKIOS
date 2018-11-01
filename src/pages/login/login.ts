import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController) {}

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.nav.setRoot(TabsPage)
    console.log("login");
    //request.post()
  }
}
