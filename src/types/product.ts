export interface ProductImage {
  id: string;
  imageUrl: string;
}


export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  stock: number;
}


export interface Product {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: ProductImage[];
  variants?: ProductVariant[];
}