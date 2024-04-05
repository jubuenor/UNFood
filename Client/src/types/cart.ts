export interface ProductCart {
  _id: String;
  name: String;
  image: String;
  price: number;
}

export interface Chaza {
  product: ProductCart;
  quantity: number;
}

export interface Cart {
  [index: string]: Chaza[];
}
