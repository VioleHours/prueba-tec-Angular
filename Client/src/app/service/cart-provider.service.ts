import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../product';

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
    const existingProduct = this.cartItems.find((p: Producto) => p.id_producto === product.id_producto);
    if (existingProduct) {
      existingProduct.stock = product.stock;
    } else {
      this.cartItems.push(product);
    }
    this.cartItemsUpdated.next(this.cartItems);
  }
  

  getTotalPrice() {
    let totalGlobal = 0;
    this.cartItems.forEach((product: Producto) => {
      if (product.stock > 0) {
        totalGlobal += product.precio * product.stock;
      }
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

  updateCartItem(updatedProduct: Producto) {
    const index = this.cartItems.findIndex((product: Producto) => product.id_producto === updatedProduct.id_producto);
    if (index !== -1) {
      this.cartItems[index].stock = updatedProduct.stock;
      this.cartItemsUpdated.next(this.cartItems);
    }
  }
}

