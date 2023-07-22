import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto, Subcategoria } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlProduct = 'https://static.compragamer.com/test/productos.json';
  private apiUrlSubCat = 'https://static.compragamer.com/test/subcategorias.json';
  private baseUrl = 'https://compragamer.net/pga/imagenes_publicadas/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrlProduct}`).pipe(
      catchError(this.handleError)
    );
  }

  getSubcategory(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(`${this.apiUrlSubCat}`).pipe(
      catchError(this.handleError)
    );
  }

  getCompleteImageUrl( product: Producto ): string {
        const prefix = 'compragamer_Imganen_general_';
        const suffix = '-med.jpg';
        if (product.imagenes && product.imagenes.length > 0 && product.imagenes[0].nombre) {
          const cleanedImageName = product.imagenes[0].nombre;
          return this.baseUrl + prefix + cleanedImageName + suffix;
        } else {
          return this.baseUrl + 'undefined' + suffix;
        }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
