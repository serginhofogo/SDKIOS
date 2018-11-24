import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { ProductPage } from '../product/product';
import { ProductsService } from '../../app/services/services';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-productList',
  templateUrl: 'productList.html'
})
  export class ProductList {

    myBaseURL:String;

    constructor(public nav: NavController, 
      public app: App, 
      private productService:ProductsService) {

        this.getBaseURL(); 
      }

      getBaseURL(){
        this.myBaseURL = this.productService.getBaseURL();
      }

 
 
  }
   