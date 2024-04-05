import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { ProductCart, Chaza } from "@/types/cart";
import { removeProductFromCart, updateProductQuantity } from "@/utils/cart";
import currencyFormatter from "@/utils/currency";

function CartProducts({
  products,
  chaza,
}: {
  products: Chaza[];
  chaza: string;
}) {
  const [chazaProducts, setChazaProducts] = useState<Chaza[]>(products);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let newTotal = 0;
    chazaProducts.forEach((product) => {
      newTotal += product.product.price * product.quantity;
    });
    setTotal(newTotal);
  }, [chazaProducts]);

  const removeProduct = (product: ProductCart) => {
    if (removeProductFromCart(product._id, chaza)) {
      const newProducts = chazaProducts.filter(
        (chazaProduct) => chazaProduct.product._id !== product._id
      );
      setChazaProducts(newProducts);
    }
  };

  const updateProduct = (product: ProductCart, quantity: number) => {
    if (quantity <= 0) return;

    if (updateProductQuantity(product._id, chaza, quantity)) {
      const newProducts = chazaProducts.map((chazaProduct) => {
        if (chazaProduct.product._id === product._id) {
          return { ...chazaProduct, quantity };
        }
        return chazaProduct;
      });
      setChazaProducts(newProducts);
    }
  };

  const renderProducts = chazaProducts.map((product, index) => {
    return (
      <Row className="border-bottom" key={index}>
        <Col sm={4} className="text-center p-2">
          <Image
            src={product.product.image.toString()}
            alt={product.product.name.toString()}
            width={66}
            height={56}
          ></Image>
        </Col>
        <Col sm={8} className="p-2">
          <div className="d-flex justify-content-between">
            <div>
              <p>{product.product.name}</p>
            </div>
            <div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeProduct(product.product)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p>
              {currencyFormatter.format(
                product.product.price * product.quantity
              )}
            </p>
            <div>
              <Button
                size="sm"
                variant="light"
                className="p-1 rounded-start border"
                onClick={() =>
                  updateProduct(product.product, product.quantity - 1)
                }
              >
                -
              </Button>
              <span className="me-2 ms-2">{product.quantity}</span>
              <Button
                size="sm"
                variant="light"
                className="p-1 rounded-end border"
                onClick={() =>
                  updateProduct(product.product, product.quantity + 1)
                }
              >
                +
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    );
  });
  return (
    <>
      {renderProducts}
      <div className="mt-2">
        <p className="text-end">
          Total:
          <strong> {currencyFormatter.format(total)}</strong>
        </p>
      </div>
    </>
  );
}

export default CartProducts;
