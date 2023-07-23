import { Component } from '@angular/core';
import { CartProviderService } from '../../service/cart-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroComponent } from '../registro/registro.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  cartItems: any = [];
  isLoggedIn = false;

  constructor(
    private cartProvider: CartProviderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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

  openModalRegister(): void {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success === true) {
        this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
          duration:3000
        });
      } else {
        this.snackBar.open('Registro cancelado o error en el registro.', 'Cerrar', {
          duration:3000
        });
      }
      this.router.navigate(['/']);
    });
  }

  showSnackBar(mesagge: string, action: string) {
    this.snackBar.open(mesagge, action, {
      duration: 3000,
    });
  }
}
