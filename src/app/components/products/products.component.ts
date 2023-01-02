import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product ={
    id: '',
    price: 0,
    images: [] ,
    title: '',
    category: {
      id: '',
      name: '', 
    },
    description: ''
  };

  constructor(
    //traemos el servicio en el componente
    private storeService: StoreService,
    //traemos el servicio
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
//cuando un componente tiene la necesidad de realizar una petición HTTP antes de ser renderizado suele utilizarse el hook ngOnInit()
//suscribe para trer la informacion y guardar en el array de productos
  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;

  }
  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data => {  
      this.toggleProductDetail();
      this.productChosen = data; 
  });

}
}
