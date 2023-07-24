import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Producto, Subcategoria } from '../../product';
import { CartProviderService } from '../../service/cart-provider.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  showFiller = false;
  showSidebar: boolean = false;
  products: Producto[] = [];
  cart: Producto[] = [];
  categories: Subcategoria[] = [];
  selectedCategory: number | null = null;
  selectedCategoryId: number = 0;
  filteredProductsArray: Producto[] = [];

  constructor(
    public productService: ProductService,
    private cartProvider: CartProviderService,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    // this.selectedCategoryId = 0;
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  fetchCategories(): void {
    this.productService.getSubcategory().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addToCart(product: Producto): void {
    this.cartProvider.addToCart(product);
  }

  getSubcategoryName(subcategoryId: number): string {
    const subcategory = this.categories.find((sub) => sub.id === subcategoryId);
    return subcategory ? subcategory.nombre : 'Sin subcategoría';
  }

  filteredCategories(): Subcategoria[] {
    return this.selectedCategory
      ? this.categories.filter(category => category.id === this.selectedCategory)
      : this.categories;
  }

  handleCategoryChange(selectedCategoryId: number): void {
    this.selectedCategoryId = selectedCategoryId;
  }  

  formatPrice(price: number): string {
    return price.toLocaleString('es-AR');
  }
  
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

}
