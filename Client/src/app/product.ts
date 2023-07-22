export interface Producto {
  destacado: number;
  nombre: string;
  id_producto: number;
  id_subcategoria: number;
  precio: number;
  imagenes: {
    nombre: string;
    id_producto_imagen: number;
    orden: number;
  }[];
  vendible: number;
  stock: number;
  garantia: number;
  iva: number;
}

export interface Subcategoria {
  id: number;
  nombre: string;
  id_agrupador: number;
  imagen: string;
  orden: number;
}

