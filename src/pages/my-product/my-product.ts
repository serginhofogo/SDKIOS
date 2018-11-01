import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-product',
  templateUrl: 'my-product.html'
})
export class MyProductPage {
  public showSlideView:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductPage');
  }

  ionViewWillEnter() {
    this.showSlideView = true;
  }

  ionViewWillLeave() {
    this.showSlideView = false;
  }

}
