import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Producto, Subcategoria } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Producto[] = [];
  cart: Producto[] = [];
  subcategories: Subcategoria[] = [];
  selectedSubcategory: number | null = null;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchSubcategories();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  fetchSubcategories(): void {
    this.productService.getSubcategory().subscribe((subcategories) => {
      this.subcategories = subcategories;
    });
  }

  addToCart(product: Producto): void {
    this.cart.push(product);
  }

  filterProductsBySubcategory(subcategoryId: number | null): void {
    this.selectedSubcategory = subcategoryId;
  }

  filteredProducts(): Producto[] {
    if (!this.selectedSubcategory) {
      return this.products;
    } else {
      return this.products.filter(
        (product) => product.id_subcategoria === this.selectedSubcategory
      );
    }
  }
}
