import { Component } from '@angular/core';
import { ProductsService } from '../../app/services/services';
import { NavController, App } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ChatBgPage } from '../chat-bg/chat-bg';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  chat = "buying";
  items:any;
  items1:any;
  brands:any;
  brand:String;
  myBaseURL:String;
  namem:String = "";

  constructor(public nav: NavController,
     public app: App,
    private productService: ProductsService) {
    this.getBrands();
  }

  getBrands(){
    this.productService.getBrands().subscribe(response => {
      this.myBaseURL = this.productService.getBaseURL();
      this.brands = response.brands;
      console.log(JSON.stringify("Brands: " + this.brands.length));
    })
  }

  changeBrand(brandm){
    console.log("Change brand" + brandm);
    this.productService.getProductsByBrand(brandm).subscribe(response => {
      this.items = response.products;
      console.log(JSON.stringify("Brands: " + this.items.length));
    })
  }

  public showProduct(item) {
    console.log('Clicked');
    console.log(item); 
    this.app.getRootNav().push(ProductPage,{item:item});
  }

  searchByName(namem){
    if(namem != ""){
      console.log("Search by name" + namem);
      this.productService.getProductsByName(namem).subscribe(response => {
        this.items1 = response.products;
        console.log(JSON.stringify("Filtered Products: " + this.items1.length));
      })
    }else{

    }
  }

}
