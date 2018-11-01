import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { MyProductPage } from '../my-product/my-product';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {

  public toggled: boolean;
  public showSearchResults: boolean;
  ads = "selling";

  constructor(public nav: NavController, public app: App) {
    this.toggled = false;
    this.showSearchResults = true;

  }


  toggleSearch() {
    this.toggled = this.toggled ? false : true;
    this.showSearchResults = this.toggled ? false : true;
  }

  showResults() {
    this.showSearchResults =  true;
  }
  clearSearch() {
    this.showSearchResults =  false;
  }

  public showProduct() {
    this.app.getRootNav().push(MyProductPage);
  }

}
