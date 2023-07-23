// import { Component, OnInit } from '@angular/core';
// import { CartProviderService } from '../cart-provider.service';
// import { ActivatedRoute } from '@angular/router'
// import { Producto } from '../product';
// import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems: any = [];

//   constructor(
//     private cartProvider: CartProviderService,
//     private route: ActivatedRoute,
//     public productService: ProductService,
//     ) { }

//     ngOnInit(): void {
//       this.cartItems = this.cartProvider.getProducts();
      
//       const params = this.route.snapshot.paramMap;
//       this.cartProvider.cartItemsUpdated.subscribe((cartItems) => {
//         this.cartItems = cartItems;
//       });
//     }
  
//     removeFromCart(product: any): void {
//       this.cartProvider.removeItems(product);
//       this.cartItems = this.cartProvider.getProducts();
//     }
//   }

import { Component, OnInit } from '@angular/core';
import { CartProviderService } from '../../service/cart-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../product'; // Import the Producto interface
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Producto[] = []; // Use the Producto type for cartItems
  cartIsEmpty: boolean = true;
  productCounts: any = {};
  count: number = 0;
  total: number = 0;

  constructor(
    private cartProvider: CartProviderService,
    private route: ActivatedRoute,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadCartData();

    this.cartProvider.getProducts().subscribe((cartItems) => {
      this.cartItems = cartItems; // Update cartItems with the latest data from the cart provider
      this.totalPrice();
      this.totalProducts();
      if (!this.cartIsEmpty) {
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    });
  }

  loadCartData(): void {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length > 0) {
      this.cartIsEmpty = false;
      savedCart.forEach((product: any) => {
        this.productCounts[product.id] = product.quantity;
      });
    }
  }

  totalPrice(): void {
    let totalAux = 0;
    if (this.cartItems.length > 0) {
      this.cartItems.forEach((product: Producto) => {
        totalAux += product.precio * product.stock;
      });
    }
    this.total = totalAux;
  }
  
  totalProducts(): void {
    let countAux = 0;
    if (this.cartItems.length > 0) {
      this.cartItems.forEach((product: Producto) => { // Use the Producto type for product
        countAux += product.stock; // Use the appropriate property from the Producto interface
      });
    }
    this.count = countAux;
  }

  handleRemove(productId: number): void {
    this.cartProvider.removeItems(productId);
  }

  handleIncrement(productId: number): void {
    this.productCounts[productId] = (this.productCounts[productId] || 0) + 1;
    const productToUpdate = this.cartItems.find((product: Producto) => product.id_producto === productId);
    if (productToUpdate) {
      productToUpdate.stock = this.productCounts[productId];
      this.cartProvider.addToCart(productToUpdate);
    }
  }
  
  handleDecrement(productId: number): void {
    this.productCounts[productId] = (this.productCounts[productId] || 0) - 1;
    if (this.productCounts[productId] <= 0) {
      delete this.productCounts[productId];
      this.cartProvider.removeItems(productId);
    } else {
      const productToUpdate = this.cartItems.find((product: Producto) => product.id_producto === productId);
      if (productToUpdate) {
        productToUpdate.stock = this.productCounts[productId];
        this.cartProvider.addToCart(productToUpdate);
      }
    }
  }  
}
