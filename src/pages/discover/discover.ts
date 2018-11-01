import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { ProductPage } from '../product/product';
import { ProductsService } from '../../app/services/services';

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html'
})
export class DiscoverPage {

  items: any;
  categoriesList: any;
  category: any;
  limit: any;

  myBaseURL:String;

  public toggled: boolean;
  public showSearchResults: boolean;

  constructor(public nav: NavController, public app: App, private productService:ProductsService) {
    this.toggled = false;
    this.showSearchResults = true;
    this.getBaseURL();
    this.getCategoriesList();
    this.getDefaults();

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

  public openFilter() {
    this.app.getRootNav().push(FilterPage);
  }
  public showProduct(item) {
    console.log('Clicked');
    console.log(item);
    this.app.getRootNav().push(ProductPage,{item:item});
  }

  ngOnInit(){
    console.log("inicio buscando Productos");
    this.getProducts(this.category);
  }

  getProducts(category){
    this.productService.getProducts(category).subscribe(response => {
      this.items = response.products;
    });
  }

  getCategoriesList(){
    this.productService.getCategoriesList().subscribe(response => {
      this.categoriesList = response.categories;
    });
  }

  getDefaults(){
    this.category = '01';
  }

  changeCategory(){
    this.getProducts(this.category);
  }

  getBaseURL(){
    this.myBaseURL = this.productService.getBaseURL();
  }

  

}
