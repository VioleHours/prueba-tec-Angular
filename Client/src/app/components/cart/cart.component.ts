import { Component, OnInit } from '@angular/core';
import { CartProviderService } from '../../service/cart-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Producto[] = [];
  cartIsEmpty: boolean = true;
  productCounts: any = {};
  count: number = 0;
  total: number = 0;
  showRegistrationMessage: boolean = false;

  constructor(
    private cartProvider: CartProviderService,
    private route: ActivatedRoute,
    public productService: ProductService,
    private router: Router // Inyectar Router
  ) {}

  ngOnInit(): void {
    this.loadCartData();
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      this.cartIsEmpty = false;
      this.cartItems = savedCart;
      this.loadCartData();
      this.totalPrice();
      this.totalProducts();
    }

    this.cartProvider.getProducts().subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalPrice();
      this.totalProducts();
      if (!this.cartIsEmpty) {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      }
    });
    this.cartProvider.cartItemsChanged.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalPrice();
      this.totalProducts();
    });
  }

  loadCartData(): void {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      this.cartIsEmpty = false;
      savedCart.forEach((product: any) => {
        this.productCounts[product.id_producto] = product.stock;
      });
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-AR');
  }

  totalPrice(): void {
    let totalAux = 0;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((product: Producto) => {
        const quantity = this.productCounts[product.id_producto] || 0;
        const productPrice = product.precio;
        totalAux += productPrice * quantity;
      });
    }

    this.total = totalAux;
  }

  totalProducts(): void {
    let countAux = 1;
    if (this.cartItems.length > 0) {
      this.cartItems.forEach((product: Producto) => {
        countAux += product.stock;
      });
    }
    this.count = countAux;
  }

  handleRemove(productId: number): void {
    this.cartProvider.removeItems(productId);
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = savedCart.filter(
      (product: any) => product.id_producto !== productId
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    this.loadCartData();
    this.totalPrice();
    this.totalProducts();
  }

  handleIncrement(productId: number): void {
    this.productCounts[productId] = (this.productCounts[productId] || 0) + 1;
    const productToUpdate = this.cartItems.find(
      (product: Producto) => product.id_producto === productId
    );
    if (productToUpdate) {
      productToUpdate.stock = this.productCounts[productId];
      this.cartProvider.updateCartItem(productToUpdate);
    }

    this.totalProducts();
    this.totalPrice();
  }

  handleDecrement(productId: number): void {
    this.productCounts[productId] = (this.productCounts[productId] || 1) - 1;
    if (this.productCounts[productId] <= 0) {
      delete this.productCounts[productId];
      this.cartProvider.removeItems(productId);
    } else {
      const productToUpdate = this.cartItems.find(
        (product: Producto) => product.id_producto === productId
      );
      if (productToUpdate) {
        productToUpdate.stock = this.productCounts[productId];
        this.cartProvider.updateCartItem(productToUpdate);
      }
    }

    this.totalProducts();
    this.totalPrice();
  }

  updateCartItemStock(productId: number, stock: number): void {
    const productToUpdate = this.cartItems.find(
      (product: Producto) => product.id_producto === productId
    );
    if (productToUpdate) {
      productToUpdate.stock = stock;
      this.cartProvider.updateCartItem(productToUpdate);
    }
  }

  handleFinalizePurchase(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      alert('compra exitosa')
    } else {
      this.showRegistrationMessage = true;
    }
  }

  closeRegistrationMessage(): void {
    this.showRegistrationMessage = false;
  }
}
