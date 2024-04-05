import React, { useState } from "react";
import styles from "@/styles/chaza.orderdashboard.module.css";
import { Card, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Order, ProductsOrderReader } from "@/types/order";
import currencyFormatter from "@/utils/currency";
import { useMutation } from "react-query";
import { UpdateOrder } from "@/pages/api/order";
import Loading from "../Loading";

function OrderDashboard({ orders }: { orders: Order[] }) {
  const [ordersList, setOrdersList] = useState<Order[]>(orders);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const renderorderList = ordersList.map((order, index) => {
    let orderNumber = order._id.replace(/\D/g, "");
    orderNumber = orderNumber.slice(orderNumber.length - 5, orderNumber.length);
    const date = new Date(order.createdAt);
    return (
      <Card
        className={`${styles.order_card}`}
        key={index}
        style={{ minWidth: "200px" }}
        onClick={() => {
          setCurrentOrder(order);
          setCurrentIndex(index);
        }}
      >
        <Card.Header>
          <div className="d-flex justify-content-between">
            <Card.Title className="text-foreground/90">{order.user}</Card.Title>
            <Card.Title className="text-foreground/90">
              # {orderNumber}
            </Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <h4
            className={`text-${
              order.state === 0
                ? "warning"
                : order.state === 1
                ? "secondary"
                : order.state === 2
                ? "info"
                : "success"
            }`}
          >
            {order.state === 0
              ? "Pendiente"
              : order.state === 1
              ? "Preparando"
              : order.state === 2
              ? "Cliente en camino"
              : "Entregado"}
          </h4>
          <h5 className="text-medium text-foreground/80 color: #979797">
            {date.toDateString()}
          </h5>
        </Card.Body>
      </Card>
    );
  });

  const renderProductsOrder = (products: ProductsOrderReader[]) => {
    return products.map((product, index) => (
      <p key={index} className={`${styles.itemorder} fs-4 `}>
        x{product.quantity} - {product.product.name}
        <span className="float-end">
          {currencyFormatter.format(product.product.price)}
        </span>
      </p>
    ));
  };

  const updateOrderMutation = useMutation({
    mutationFn: UpdateOrder,
    onSuccess: (data) => {
      setLoading(false);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleChangeState = () => {
    if (currentOrder) {
      setLoading(true);
      let state = currentOrder.state;
      state = state === 0 ? 1 : state === 1 ? 2 : state === 2 ? 3 : 3;
      setCurrentOrder({ ...currentOrder, state });
      let newOrders = ordersList;
      newOrders[currentIndex] = { ...currentOrder, state };
      setOrdersList(newOrders);
      updateOrderMutation.mutate({
        _id: currentOrder._id,
        user: currentOrder.user,
        chaza: currentOrder.chaza,
        products: currentOrder.products,
        total: currentOrder.total,
        state: state,
      });
    }
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Row className="w-100 gx-0 ">
        <Col md={5} className={`${styles.navbar} overflow-auto`}>
          {renderorderList}
        </Col>

        <Col md={7}>
          {currentOrder ? (
            <Card
              className={`${styles.currentorder_card}  mt-3  h-90 w-90 ms-2 me-2`}
            >
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="m-0"> {currentOrder.user}</Card.Title>
                  <a
                    className="btn btn-outline-success"
                    href={`https://wa.me/57${currentOrder.numeroCelular}`}
                    target="_blank"
                  >
                    <IoLogoWhatsapp size={30}></IoLogoWhatsapp>
                  </a>
                </div>
                <Card.Title></Card.Title>
              </Card.Header>
              <Card.Body className="overflow-auto">
                {renderProductsOrder(currentOrder.products)}
              </Card.Body>

              <Card.Footer className="mt-4 mb-4 h-90 w-90 ms-4 me-3 ">
                <h1>
                  Total{" "}
                  <span> {currencyFormatter.format(currentOrder.total)} </span>
                </h1>
                <p className="fs-4">
                  Estado actual:{" "}
                  <span>
                    {currentOrder.state === 0
                      ? "Pendiente"
                      : currentOrder.state === 1
                      ? "Preparando"
                      : currentOrder.state === 2
                      ? "Cliente en camino"
                      : "Entregado"}{" "}
                  </span>
                </p>
                <ProgressBar
                  animated
                  variant={
                    currentOrder.state === 0
                      ? "warning"
                      : currentOrder.state === 1
                      ? "secondary"
                      : currentOrder.state === 2
                      ? "info"
                      : "success"
                  }
                  now={
                    currentOrder.state === 0
                      ? 15
                      : currentOrder.state === 1
                      ? 50
                      : currentOrder.state === 2
                      ? 80
                      : 100
                  }
                ></ProgressBar>
                {currentOrder.state !== 3 ? (
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    <p className="fs-3 m-0">Actualizar estado a:</p>
                    <Button
                      variant="success"
                      className="ms-3"
                      onClick={handleChangeState}
                    >
                      {currentOrder.state === 0
                        ? "Preparando"
                        : currentOrder.state === 1
                        ? "Listo para recoger"
                        : currentOrder.state === 2
                        ? "Entregado"
                        : "success"}
                    </Button>
                  </div>
                ) : null}
              </Card.Footer>
            </Card>
          ) : (
            <h1 className="m-5">Selecciona una orden</h1>
          )}
        </Col>
      </Row>
    </>
  );
}

export default OrderDashboard;
