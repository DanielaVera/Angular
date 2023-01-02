import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiurl = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    //creamos un servicio por inyeccion de dependencias
    private http: HttpClient
  ) { }

  

  getAllProducts() {
    //solicitud de tipo GET, devuelva un array de productos de la interfaz Product 
    return this.http.get<Product[]>(this.apiurl);
  }

  getProduct(id: string) {
    //concatenamos el id, hacemos un request de un id en particular
    return this.http.get<Product>(`${this.apiurl}/${id}`);
  }
}
