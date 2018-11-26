import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, LoadingController} from 'ionic-angular';
import { ProductsService } from '../../app/services/services';
import { CreateAdModalPage } from '../create-ad-modal/create-ad-modal';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-productList',
  templateUrl: 'productList.html'
})

  export class ProductList {

    myBaseURL:String;
    home:String = "products";
    public showSearchResults: boolean;
    title:String;
    cat:any;
    items: any;

    constructor(public nav: NavController, 
      public navParams: NavParams,
      public app: App,
      private productService:ProductsService) {
        this.title = "Categoría";
        this.showSearchResults = true;
        this.getBaseURL(); 
        this.cat = navParams.get('mycat');
        //console.log("RECIVED CAT: " + JSON.stringify(this.cat));
        this.getProducts(this.cat.code);
      }

      getBaseURL(){
        this.myBaseURL = this.productService.getBaseURL();
      }

      public showProduct(item) {
        console.log('Clicked');
        console.log(item); 
        this.app.getRootNav().push(ProductPage,{item:item});
      }

      getProducts(category){
        this.productService.getProducts(category).subscribe(response => {
          this.items = response.products;
          //console.log(JSON.stringify(this.items));
        });
      }
 
 
  }
   