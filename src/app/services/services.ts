import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductsService{
    http:any;
    baseURL:String;

    constructor(http:Http){
        this.http = http;
        this.baseURL = 'http://easytool.wwwaz1-ss6.a2hosted.com:49152/';
    }

    getProducts(category){
        var formatURL = this.baseURL+'categories/'+category;
        console.log('Category: ' + formatURL);     
        return this.http.get(formatURL)
        .map(res => res.json());
    }

    getProduct(id){
        var formatURL = this.baseURL+'products/'+id;
        console.log('Product Id: ' + formatURL);     
        return this.http.get(formatURL)
        .map(res => res.json());
    }

    getCategoriesList(){
        var formatURL = this.baseURL+'categories';
        console.log('Categories List: ' + formatURL);     
        var tempCat = this.http.get(formatURL).map(res => res.json());
        console.log('Categories List OBJ: ' + JSON.stringify(tempCat)); 
        return tempCat;
    }

    getBaseURL(){
        return this.baseURL;
    }

    getBrand(brandID){
        var formatURL = this.baseURL+'brands/'+brandID;
        console.log('URL to Brand: ' + formatURL);  
        var tempBrand = this.http.get(formatURL).map(res => res.json());   
        console.log("tempBrand: " + JSON.stringify(tempBrand));
        return tempBrand;
    }

}