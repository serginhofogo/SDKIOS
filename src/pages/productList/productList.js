import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { ProductPage } from '../product/product';
import { ProductsService } from '../../app/services/services';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';



  export class ProductList {

    constructor(public nav: NavController, public app: App, private productService:ProductsService) {
        this.toggled = false;
        this.showSearchResults = true;
        this.getBaseURL();
        this.getCategoriesList();
        this.getDefaults();
        this.liked(null);
      }

  }
   