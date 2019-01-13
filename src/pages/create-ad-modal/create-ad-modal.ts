import { Component } from '@angular/core';
import { ViewController, App, LoadingController, NavParams, AlertController} from 'ionic-angular';
import { PublishAdPage } from '../publish-ad/publish-ad';
import { DiscoverPage } from '../discover/discover';
import { ProductsService } from '../../app/services/services';
import { LoginPage } from '../login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-create-ad-modal',
  templateUrl: 'create-ad-modal.html'
})
export class CreateAdModalPage {

  order:any;
  total:number = 0;
  baseURL:String = ""; 

  constructor( public viewCtrl: ViewController,
    public app: App,
    private productService:ProductsService,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private iab: InAppBrowser) {

      console.log("Orders Page");
      var user = this.productService.getEmail();

      if(user!=null && user != ""){
        console.log("Will load Orders");
        this.order = navParams.get('order');
        this.calculateTotal();
        this.baseURL = this.productService.getBaseURL();
        for(var i=0;i<this.order.items.length;i++){
          console.log(this.order.items[i].product);
          this.getProduct(this.order.items[i].product, i);
        }
      }else{
        console.log("Go to Login");
        this.app.getRootNav().push(LoginPage);
      }



  }

  easyPago(){
    const browser = this.iab.create('http://easytoolsec.com/services/uploads/WEB/Pago/examples/Checkout.html');

  /*
  browser.on('loadstop').subscribe(event => {
    browser.insertCSS({ code: "body{color: red;" });
  });

  browser.close();
  */
  }

  calculateTotal(){
    this.total = 0;
    for(var i = 0 ; i<this.order.items.length;i++){
      this.total += this.order.items[i].total;
    }
    console.log(this.total);
  }

  public checkout() {
    this.app.getRootNav().push(PublishAdPage);
  }

  public continueShop() {
    this.app.getRootNav().push(DiscoverPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteItem(productId){
    var index = null;
    for(var i = 0 ; i<this.order.items.length;i++){
      if(productId == this.order.items[i]._id){
        index = i;
        console.log("index:" + index);
        this.showPopup("Alerta", "Está seguro de eliminar este item del carrito de compras?", index);
      }
    }
  }

  showPopup(title, text, index) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            console.log("will delete:" + index);
            this.order.items.splice(index,1);
            this.calculateTotal();
            this.updateOrder(this.order);
          }

        }
      ]
    });
    alert.present();
  }


  updateOrder(myOrder){
    this.productService.updateOrder(myOrder).subscribe(response => {
      if(response.message == "Order updated"){
      
      }
    });
  }

  getProduct(productId, i){
    this.productService.getProduct(productId).subscribe(response =>{
      console.log(JSON.stringify(response));
      this.order.items[i]["imgUrl"] = this.baseURL + response.product.productImage[0];
      this.order.items[i]["productName"] = response.product.name;
      console.log(JSON.stringify(this.order.items[i]));
    });
  }



}
