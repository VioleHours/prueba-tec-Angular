import { Component } from '@angular/core';
import { CartProviderService } from '../cart-provider.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  cartItems: any = [];
  isLoggedIn = false;

  constructor(private cartProvider: CartProviderService) { }

  ngOnInit(): void {
    this.cartItems = this.cartProvider.getProducts();

    this.cartProvider.cartItemsUpdated.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  removeFromCart(product: any): void {
    this.cartProvider.removeItems(product);
    this.cartItems = this.cartProvider.getProducts();
  }
}
