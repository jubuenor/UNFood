import { Product } from "@/types/product";
import { Cart, Chaza, ProductCart } from "@/types/cart";

export function addProductToCart(
  chaza: string,
  product: Product,
  quantity: number
): boolean {
  const cart: Cart = JSON.parse(localStorage.getItem("cart") ?? "{}");

  const newProduct: ProductCart = {
    _id: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
  };
  const cartChaza: Chaza[] = cart[chaza] ?? [];

  const alreadyInCart = cartChaza.find(
    (value) => value.product._id === product._id
  );
  if (alreadyInCart) return false;

  cartChaza.push({ product: newProduct, quantity });

  cart[chaza] = cartChaza;
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}

export function getCart(): Cart {
  return JSON.parse(localStorage.getItem("cart") ?? "{}");
}

export function removeProductFromCart(
  idProduct: String,
  chaza: string
): boolean {
  const cart: Cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
  const cartChaza: Chaza[] = cart[chaza] ?? [];

  const index = cartChaza.findIndex((value) => value.product._id === idProduct);
  if (index === -1) return false;

  cartChaza.splice(index, 1);

  if (cartChaza.length === 0) delete cart[chaza];
  else cart[chaza] = cartChaza;

  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}

export function updateProductQuantity(
  idProduct: String,
  chaza: string,
  newQuantity: number
) {
  const cart: Cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
  const cartChaza: Chaza[] = cart[chaza] ?? [];

  const index = cartChaza.findIndex((value) => value.product._id === idProduct);
  if (index === -1) return false;

  cartChaza[index].quantity = newQuantity;
  cart[chaza] = cartChaza;
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}

export function deleteCart() {
  localStorage.removeItem("cart");
}

export function removeChazaFromCart(chaza: string) {
  const cart: Cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
  delete cart[chaza];
  localStorage.setItem("cart", JSON.stringify(cart));
}
