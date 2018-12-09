import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, LoadingController} from 'ionic-angular';
import { ProductsService } from '../../app/services/services';
import { CreateAdModalPage } from '../create-ad-modal/create-ad-modal';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})

export class ProductPage {

  item:any;
  myBaseURL:String;
  brandImg:String;
  brandName:String;
  cantidad = 1;
  order:any;

  public showSlideView:boolean = true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public app: App, 
    private productService:ProductsService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

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

  msMin(myOrder){
    if(myOrder.quantity!= 0 && myOrder.quantity!= ""){
      myOrder['quantity']--;
      this.cantidad = myOrder['quantity'];
    }
  }
  msPlus(myOrder){
    myOrder['quantity']++;
    this.cantidad = myOrder['quantity'];
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

  public buyProduct(myProduct) {
    var user = this.productService.getEmail();
    if(user != "" && user != null){
      console.log("MyOrder: " + JSON.stringify(myProduct));
      var completedForm = 1;
      if(myProduct.quantity==null || myProduct.quantity==""){
        completedForm = 0;
        this.showPopup("Error", "Ingrese una cantidad válida");
      }
      if(completedForm == 1){
        let loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Cargando contenido.'
        });
        loading.present();

        this.productService.loadOrders().subscribe(response => {
          
          for(var i=0;i<response.orders.length;i++){
            if(response.orders[i].estado=="open"){
              this.order = response.orders[i];
              console.log("Orden existente");
            }
          }

          loading.dismiss();
          console.log("Existing Order: " + JSON.stringify(this.order));

            myProduct['product'] = this.item._id;
            myProduct['total'] = this.item.price * myProduct.quantity;

            if(myProduct.option == null){
              myProduct['option'] = "default";
            }

          if(this.order==null){
            console.log("SEND OBJ: " + JSON.stringify(myProduct));
            this.createOrder(myProduct);
          }else{
            this.updateOrder(myProduct,this.order);
          }
        });
      }
    }else{
      this.app.getRootNav().push(LoginPage);
    }


  }



  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
           // this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }


  loadOrders(){
    var myOrder;
    this.productService.loadOrders().subscribe(response => {
      console.log(JSON.stringify(response.orders));
      for(var i=0;i<response.orders.length;i++){
        if(response.orders[i].estado=="open"){
          myOrder = response.orders[i];
        }
      }
      console.log("OPEN ORDER: " + JSON.stringify(myOrder));
      this.app.getRootNav().push(CreateAdModalPage,{order:myOrder});
    });
  }

  createOrder(myProduct){
    console.log("Creating order");
    var myArr = [];
    myArr.push(myProduct);
    this.productService.createOrder(myArr).subscribe(response => {
      if(response.message == "Created order successfully"){
        this.app.getRootNav().push(CreateAdModalPage,{order:response.createdOrder});
      }
    });
  }

  updateOrder(myProduct,original){
    console.log("Creating order");
    original.items.push(myProduct);
    this.productService.updateOrder(original).subscribe(response => {
      if(response.message == "Order updated"){
        this.loadOrders();
      }
    });
  }

}
