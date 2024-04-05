export interface Product {
  _id: String;
  name: String;
  name_chaza: String;
  description: String;
  price: number;
  image: String;
  category: number;
  stock: number;
  total_sales: number;
}

export interface ProductCreate {
  chaza_id: string;
  name: string;
  description: string;
  price: number;
  category: number;
  image: null | String | File;
  stock: number;
}
