import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController} from 'ionic-angular';
import { ProductsService } from '../../app/services/services';
import { CreateAdModalPage } from '../create-ad-modal/create-ad-modal';

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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public app: App, 
    private productService:ProductsService,
    private alertCtrl: AlertController) {
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

  public buyProduct(item) {
    console.log('Clicked');
    console.log(item);
    this.app.getRootNav().push(CreateAdModalPage,{item:item});
  }



  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

}
