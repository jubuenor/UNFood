import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Offcanvas, Accordion, Button, ProgressBar } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { getCart } from "@/utils/cart";
import CartProducts from "./CartProducts";
import { Cart } from "@/types/cart";
import { removeChazaFromCart, deleteCart } from "@/utils/cart";
import { getToken } from "@/pages/api/token";
import { useMutation } from "react-query";
import { CreateOrder } from "@/types/order";
import { createOrder } from "@/pages/api/order";
import Loading from "../Loading";
import Message from "../Message";

function Cart({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  const [cart, setCart] = useState<Cart>({});
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const handleShowMessage = () => setShowMessage(true);
  const handleCloseMessage = () => setShowMessage(false);

  useEffect(() => {
    setCart(getCart());
  }, [show]);

  const removeChaza = (chaza: string) => {
    removeChazaFromCart(chaza);
    const newCart = { ...cart };
    delete newCart[chaza];
    setCart(newCart);
  };

  const handleCompraMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      setLoading(false);
      setMessage("Orden realizada con éxito");
      setTypeMessage("success");
      handleShowMessage();
      window.location.href = "/client/orders";
    },
    onError: (error: any) => {
      setLoading(false);
      setMessage("Error al realizar la orden");
      setTypeMessage("danger");
      handleShowMessage();
    },
  });

  const handleCompra = (chaza: string) => {
    setLoading(true);
    const user = getToken()?.id;
    if (!user) {
      setLoading(false);
      return;
    }
    const cart: Cart = getCart();
    const CartChaza = cart[chaza];
    let total = 0;
    CartChaza.forEach((product) => {
      total += product.product.price * product.quantity;
    });

    const products = CartChaza.map((product) => {
      return {
        product: product.product._id.toString(),
        quantity: product.quantity,
      };
    });

    const order: CreateOrder = {
      user,
      chaza,
      total,
      products: products,
    };
    handleCompraMutation.mutate(order);

    removeChaza(chaza);
  };

  const renderCartChaza = Object.keys(cart).map((key, index) => {
    return (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>
          <strong>{key}</strong>
        </Accordion.Header>
        <Accordion.Body>
          <Link
            href="/client/chaza/mcdonals"
            className="nav-link text-secondary border-bottom"
          >
            Volver a la tienda
          </Link>

          <CartProducts products={cart[key]} chaza={key}></CartProducts>
          <div className="d-flex justify-content-end align-items-center mt-3">
            <Button
              variant="success"
              className="me-3"
              onClick={() => handleCompra(key)}
            >
              Confirmar compra
            </Button>
            <Button variant="danger" onClick={() => removeChaza(key)}>
              <FaTrash size={16}></FaTrash>
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <>
      <Message
        show={showMessage}
        handleClose={handleCloseMessage}
        message={message}
        type={typeMessage}
      ></Message>
      {loading ? <Loading></Loading> : null}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FaShoppingCart></FaShoppingCart> Carrito
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Object.keys(cart).length === 0 ? (
            <div className="text-center">
              <p className="text-secondary">No hay productos en el carrito</p>
              <Link href="/client/products" className="btn btn-primary">
                Comprar ahora
              </Link>
            </div>
          ) : (
            <>
              <Accordion>{renderCartChaza}</Accordion>
              <div className="position-absolute bottom-0 mb-2 w-100">
                <Button
                  variant="link"
                  className="nav-link m-auto"
                  onClick={() => {
                    deleteCart();
                    setCart({});
                  }}
                >
                  <FaTrash size={20}></FaTrash>
                  <span className="ms-2">Vaciar todo</span>
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
