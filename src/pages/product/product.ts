import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsService } from '../../app/services/services';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {

  item:any;
  myBaseURL:String;
  brandImg:String;
  brandName:String;

  public showSlideView:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private productService:ProductsService) {
    this.getBaseURL();
    this.item = navParams.get('item');
    this.getBrand(this.item.brand);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.getBrand(this.item.brand);
    console.log(this.brandImg);
  }

  ionViewWillEnter() {
    this.showSlideView = true;
  }

  ionViewWillLeave() {
    this.showSlideView = false;
  }

  getBaseURL(){
    this.myBaseURL = this.productService.getBaseURL();
  }
  
  getBrand(brandID){
    this.productService.getBrand(brandID).subscribe(response => {
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response.brand));
      this.brandImg = response.brand.brandImage;
      this.brandName = response.brand.name;
      console.log(this.brandImg);
      console.log(this.brandName);
    });
  }

}
