import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './product';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Producto[], categoryId: number): Producto[] {
    if (!products || !categoryId) {
      return products;
    }

    const filteredProducts = products.filter((product) => product.id_subcategoria === categoryId);
    
    console.log('Products:', products);
    console.log('CategoryId:', categoryId);
    console.log('Filtered Products:', filteredProducts);

    return filteredProducts;
  }

}
