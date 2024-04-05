import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { Product } from "@/types/product";
import { Button, Col, Row } from "react-bootstrap";
import styles from "@/styles/products.module.css";
import currencyFormatter from "@/utils/currency";
import Image from "next/image";
import { addProductToCart, removeChazaFromCart, getCart } from "@/utils/cart";
import Message from "@/components/Message";
import Loading from "../Loading";
import { getToken } from "@/pages/api/token";
import { Cart } from "@/types/cart";
import { CreateOrder } from "@/types/order";
import { createOrder } from "@/pages/api/order";
import { useMutation } from "react-query";

function ModalProductDetail({
  show,
  handleClose,
  product,
}: {
  show: boolean;
  handleClose: () => void;
  product: Product;
}) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [showMeesage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);

  const handelAddProductToCart = (product: Product) => {
    if (addProductToCart(product.name_chaza.toString(), product, count)) {
      setMessage("Producto agregado al carrito");
      setTypeMessage("success");
      handleShowMessage();
    } else {
      setMessage("Producto ya agregado al carrito");
      setTypeMessage("warning");
      handleShowMessage();
    }
  };

  // Static Information
  const staticInfo = {
    rating: "4.5",
    reviews: "250 Reviews",
    deliveryTime: "30-45 mins",
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
    handelAddProductToCart(product);
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

    removeChazaFromCart(chaza);
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Message
        show={showMeesage}
        handleClose={handleCloseMessage}
        message={message}
        type={typeMessage}
      ></Message>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        className={`${styles.product_detail}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} lg={6}>
              <div className={styles.img_container}>
                <Image
                  src={product.image.toString()}
                  alt={`${product.name} image`}
                  fill
                ></Image>
              </div>
            </Col>
            <Col md={6} lg={6}>
              <p>
                <strong>Descripción: </strong>
                {product.description}
              </p>

              <p>
                Ubicado en: <strong>{product.name_chaza}</strong>
              </p>
              <p>
                <strong>Precio:</strong>{" "}
                {currencyFormatter.format(product.price)}
              </p>
              <p>
                <strong>Unidades Disponibles:</strong>{" "}
                {product.stock.toString()}
              </p>
              <p>
                <strong>Tiempo estimado de entrega:</strong>{" "}
                {staticInfo.deliveryTime}
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "flex-start" }}>
          <Button variant="danger" size="sm" onClick={() => setCount(1)}>
            <FaTrash />
          </Button>
          <Button variant="light" size="sm" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{count}</span>
          <Button size="sm" variant="light" onClick={() => setCount(count + 1)}>
            +
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={() => handelAddProductToCart(product)}
          >
            Agregar y seguir comprando
          </Button>
          <Button
            style={{ backgroundColor: "#550A2D", borderColor: "#550A2D" }}
            size="sm"
            onClick={() => handleCompra(product.name_chaza.toString())}
          >
            Agregar y comprar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProductDetail;
