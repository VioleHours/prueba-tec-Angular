import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from './product';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: Producto[], selectedCategoryId: number | null): Producto[] {
    if (!items || selectedCategoryId === null || selectedCategoryId === undefined) {
      return items;
    }

    return items.filter((item) => item.id_subcategoria === selectedCategoryId);
  }
}
