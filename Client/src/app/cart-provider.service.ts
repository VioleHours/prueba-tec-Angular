// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Producto } from './product';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartProviderService {
//   public cartItems: any = [];
//   public cartItemsUpdated = new BehaviorSubject<any>([]);

//   constructor() {}

//   getProducts() {
//     return this.cartItemsUpdated.asObservable();
//   }

//   setProducts(product: any) {
//     this.cartItems.push(...product);
//     this.cartItemsUpdated.next(product);
//   }

//   addToCart(product: any) {
//     this.cartItems.push(product);
//     this.cartItemsUpdated.next(this.cartItems);
//     this.getTotalPrice();
//   }

//   getTotalPrice() {
//     let totalGlobal = 0;
//     this.cartItems.map((a: any) => {
//       totalGlobal += a.total;
//     });
//     return totalGlobal;
//   }

//   removeItems(product: any) {
//     this.cartItems.map((a: any, index: any) => {
//       if (product === a) {
//         this.cartItems.splice(index, 1);
//       }
//     });
//     this.cartItemsUpdated.next(this.cartItems);
//   }

//   removeAllCart() {
//     this.cartItems = [];
//     this.cartItemsUpdated.next(this.cartItems);
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartProviderService {
  public cartItems: any[] = [];
  public cartItemsUpdated = new BehaviorSubject<Producto[]>([]);

  constructor() {}

  getProducts() {
    return this.cartItemsUpdated.asObservable();
  }

  setProducts(products: Producto[]) {
    this.cartItems.push(...products);
    this.cartItemsUpdated.next(this.cartItems);
  }

  addToCart(product: Producto) {
    this.cartItems.push(product);
    this.cartItemsUpdated.next(this.cartItems);
    this.getTotalPrice();
  }

  getTotalPrice() {
    let totalGlobal = 0;
    this.cartItems.map((product: Producto) => {
      totalGlobal += product.precio * product.stock; // Use the appropriate property from the Producto interface
    });
    return totalGlobal;
  }

  removeItems(productId: number) {
    const index = this.cartItems.findIndex((product: Producto) => product.id_producto === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsUpdated.next(this.cartItems);
    }
  }

  removeAllCart() {
    this.cartItems = [];
    this.cartItemsUpdated.next(this.cartItems);
  }
}

