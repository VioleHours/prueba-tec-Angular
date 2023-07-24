import { Component } from '@angular/core';
import { CartProviderService } from '../../service/cart-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistroComponent } from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
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

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
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
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
        this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/productos']);
      } else {
        this.snackBar.open(
          'Registro cancelado o error en el registro.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
      }
    });
  }

  showSnackBar(mesagge: string, action: string) {
    this.snackBar.open(mesagge, action, {
      duration: 3000,
    });
  }

  openModalLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success === true) {
        this.isLoggedIn = true;
        this.snackBar.open('¡Inicio de sesión exitoso!', 'Cerrar', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Inicio de sesión cancelado o error en el inicio de sesión.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
}
