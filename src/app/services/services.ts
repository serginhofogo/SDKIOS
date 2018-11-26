import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductsService{
    http:any;
    baseURL:String;
    authKey:String;
    

    // from WEB
    data:any;
    token:String;
    user:String;
    listId:String;
    

    constructor(http:Http){
        this.http = http;
        this.baseURL = 'http://easytool.wwwaz1-ss6.a2hosted.com:49152/';
        // this.baseURL = 'http://localhost:49152/';
        this.token = "";
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

    getEmail(){
        return this.user;
    }   

    getBrand(brandID){
        var formatURL = this.baseURL+'brands/'+brandID;
        console.log('URL to Brand: ' + formatURL);  
        var tempBrand = this.http.get(formatURL).map(res => res.json());   
        console.log("tempBrand: " + JSON.stringify(tempBrand));
        return tempBrand;
    }


    getBrands(){
        var formatURL = this.baseURL+'brands/';
        console.log('URL to Brand: ' + formatURL);  
        var tempBrands = this.http.get(formatURL).map(res => res.json());   
        console.log("Brands: " + JSON.stringify(tempBrands));
        return tempBrands;
    }

    loginUser(credentials){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.data = credentials;
        return this.http.post(this.baseURL.concat('user/login'),this.data,{ headers: headers})
        .map(res => JSON.parse(res._body)); 
    }

    saveCredentials(usuario, token){
        this.token = token;
        this.user = usuario;
    }

    loadOrders(){
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'orders/email/'+this.user;   
        var myOrders = this.http.get(formatURL,{ headers: headers}).map(res => res.json());   
        return myOrders;
    }

    createOrder(myOrder){
        console.log("Calling create service ");
        var myAuth = this.token;
        const formCat = new FormData;
        formCat.append('user',this.user.toString());
        formCat.append('estado','open');
        formCat.append('items',JSON.stringify(myOrder));
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'orders/';   
        var myOrders = this.http.post(formatURL,formCat,{ headers: headers}).map(res => res.json());   
        return myOrders;
    }

    updateOrder(myOrder){
        console.log("Calling update service ");
        var myAuth = this.token;
        const formCat = new FormData;
        formCat.append('user',this.user.toString());
        formCat.append('estado',myOrder.estado);
        formCat.append('items',JSON.stringify(myOrder.items));
        if(myOrder.delivery != null){
            formCat.append('delivery',myOrder.delivery);
        }
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL + 'orders/update/' + myOrder._id;   
        var myOrders = this.http.patch(formatURL,formCat,{ headers: headers}).map(res => res.json());   
        return myOrders;
    }

    registerUser(registerForm, myPhoto){
        console.log("Calling create service ");
        const formCat = new FormData;
        formCat.append('name',registerForm.name);
        formCat.append('email',registerForm.email);
        formCat.append('password',registerForm.password);
        formCat.append('numeroCelular',registerForm.numeroCelular);
        formCat.append('userImage', myPhoto, registerForm.numeroCelular + ".jpg");
        let headers = new Headers();
        var formatURL = this.baseURL+'user/signup';   
        var myOrders = this.http.post(formatURL,formCat,{ headers: headers}).map(res => res.json());   
        return myOrders;
    }

    getUser(){
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'user/user/'+this.user;   
        var myUser = this.http.get(formatURL,{ headers: headers}).map(res => res.json());   
        return myUser;
    }


    createUserList(){
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'lists/';
        const formCat = new FormData;
        formCat.append('user',String(this.user));
        formCat.append('products',"[]");
        var myOrders = this.http.post(formatURL,formCat,{ headers: headers}).map(res => res.json());   
        return myOrders;
    }

    updateList(myUserList){
        console.log("willUpdateList: " + JSON.stringify(myUserList));
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'lists/update/'+this.listId;
        const formCat = new FormData;
        formCat.append('user',String(this.user));
        formCat.append('products',JSON.stringify(myUserList));
        var myList = this.http.patch(formatURL,formCat,{ headers: headers}).map(res => res.json());   
        return myList;
    }

    saveUserListId(listId){
        this.listId = listId;
    }

    getUserList(){
        console.log("Obteniendo Lista Usuario...");
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'lists/'+this.listId;   
        var myList = this.http.get(formatURL,{ headers: headers}).map(res => res.json(), err =>err.json()); 
        return myList;
    }

    getUserListProducts(){
        console.log("Obteniendo Lista Productos...");
        var myAuth = this.token;
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${myAuth}`);
        var formatURL = this.baseURL+'lists/email/'+this.user;   
        var myList = this.http.get(formatURL,{ headers: headers}).map(res => res.json(), err =>err.json()); 
        return myList;
    }

    getProductsByBrand(brandId){
        console.log("Obteniendo Lista por marca...");
        var formatURL = this.baseURL+'brands/brand/'+brandId;   
        var myList = this.http.get(formatURL).map(res => res.json(), err =>err.json()); 
        return myList;
    }

    getProductsByName(name){
        console.log("Obteniendo Lista por nombre...");
        var formatURL = this.baseURL+'products/name/'+name;   
        var myList = this.http.get(formatURL).map(res => res.json(), err =>err.json()); 
        return myList;
    }

}