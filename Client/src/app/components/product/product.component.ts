import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Producto, Subcategoria } from '../../product';
import { CartProviderService } from '../../service/cart-provider.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  showSidebar: boolean = false;
  products: Producto[] = [];
  categories: Subcategoria[] = [];
  filteredProducts: Producto[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    public productService: ProductService,
    private cartProvider: CartProviderService,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Component initialized.');
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filterProducts();
    });
  }

  fetchCategories(): void {
    this.productService.getSubcategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  filterProducts(): void {
    if (this.selectedCategoryId === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => {
        return product.id_subcategoria === Number(this.selectedCategoryId);
      });
    }
  }
  

  addToCart(product: Producto): void {
    this.cartProvider.addToCart(product);
  }

  getSubcategoryName(subcategoryId: number): string {
    const subcategory = this.categories.find((sub) => sub.id === subcategoryId);
    return subcategory ? subcategory.nombre : 'Sin subcategoría';
  }

  handleCategoryChange(selectedCategoryId: number | null): void {
    this.selectedCategoryId = selectedCategoryId;
    if (this.selectedCategoryId === null) {
      this.fetchProducts();
    } else {
      this.filterProducts();
    }
  }

  reloadProducts(): void {
    this.fetchProducts();
    this.filterProducts();
    this.changeDetectorRef.detectChanges();
}

  formatPrice(price: number): string {
    return price.toLocaleString('es-AR');
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
