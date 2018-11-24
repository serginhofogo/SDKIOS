import { Component } from '@angular/core';
import { ProductsService } from '../../app/services/services';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  myBaseURL:String = '';
  myUser: any = null;
  userImage:String;

  constructor(public nav: NavController, 
    public app: App,
    public productService: ProductsService) {
    this.getBaseURL()
    this.getUserData();
  }

  getUserData(){
    this.productService.getUser().subscribe(response =>{
      this.myUser = response;
      console.log(JSON.stringify(response));
    });
  }

  public goToLogin() {
    this.app.getRootNav().push(LoginPage);
  }


  getBaseURL(){
    this.myBaseURL = this.productService.getBaseURL();
  }
}
