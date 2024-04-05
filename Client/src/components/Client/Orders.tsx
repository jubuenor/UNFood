import React, { useState, useEffect } from "react";
import styles from "@/styles/orders.module.css";
import { Card, Badge, Row, Col, ProgressBar, Accordion } from "react-bootstrap";
import Image from "next/image";
import { Order, ProductsOrderReader } from "@/types/order";
import currencyFormatter from "@/utils/currency";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

function Orders({ orders }: { orders: Order[] }) {
  const renderProducts = (products: ProductsOrderReader[]) =>
    products.map((product, index) => (
      <div
        className="d-flex justify-content-between align-items-center"
        key={index}
      >
        <Image
          src={product.product.image.toString()}
          alt={product.product.name.toString()}
          width={66}
          height={56}
        ></Image>
        <div>
          <p className="m-auto">
            {product.product.name} x {product.quantity}
          </p>
        </div>
      </div>
    ));

  const renderOrders = orders.map((order, index) => {
    const date = new Date(order.createdAt);
    return (
      <Card className="w-100" key={index}>
        <Card.Body>
          <Card.Header className="d-flex justify-content-between">
            <p>
              <strong>{order.chaza}</strong> - {date.toDateString()}
            </p>

            <div>
              <Badge
                bg={
                  order.state === 0
                    ? "secondary"
                    : order.state === 1
                    ? "warning"
                    : order.state === 2
                    ? "success"
                    : "success"
                }
                className="text-center fs-5 m-auto"
                pill
              >
                {order.state === 0
                  ? "Pendiente"
                  : order.state === 1
                  ? "En preparación"
                  : order.state === 2
                  ? "Listo para recoger"
                  : "Entregado"}
              </Badge>
            </div>
          </Card.Header>
          <div className="ms-4 mt-2">
            <Row className="gx-0">
              <Col md={4}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ver pedido</Accordion.Header>
                    <Accordion.Body>
                      {renderProducts(order.products)}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="text-end mt-2">
                  <p>
                    Total:{" "}
                    <strong> {currencyFormatter.format(order.total)} </strong>
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex flex-column m-auto mt-3">
                  <div className="d-flex justify-content-evenly align-items-center mt-2">
                    <Link
                      href={`/client/chaza/${order.chaza}`}
                      className="nav-link text-success m-0 p-0"
                    >
                      Ver chaza
                    </Link>
                    <a
                      className="btn btn-outline-success btn-sm"
                      href={`https://wa.me/57${order.numeroCelular}`}
                      target="_blank"
                    >
                      <IoLogoWhatsapp size={30}></IoLogoWhatsapp>
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="mt-3">
                  {order.state === 0 ? (
                    <p className="text-secondary m-auto">
                      {" "}
                      Tu pedido esta pendiente{" "}
                    </p>
                  ) : order.state === 1 ? (
                    <p className="text-warning m-auto">
                      Tu pedido esta siendo preparado
                    </p>
                  ) : order.state === 2 ? (
                    <p className="text-success m-auto">
                      Ya puedes recoger tu pedido
                    </p>
                  ) : (
                    <p className="text-danger m-auto">Pedido entregado</p>
                  )}
                  <ProgressBar
                    now={
                      order.state === 0
                        ? 15
                        : order.state === 1
                        ? 60
                        : order.state === 2
                        ? 80
                        : 100
                    }
                    variant={`${
                      order.state === 0
                        ? "secondary"
                        : order.state === 1
                        ? "warning"
                        : order.state === 2
                        ? "success"
                        : "success"
                    }`}
                    animated={order.state !== 3}
                    className="mt-3"
                  ></ProgressBar>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className={`${styles.orders}`}>
      <h1 className="p-3">Tus pedidos</h1>
      <div>
        {orders.length === 0 ? (
          <>
            <h1>No tienes pedidos</h1>
            <Link href={`/client/products/`} className="btn btn-primary">
              Compra ahora
            </Link>
          </>
        ) : (
          renderOrders
        )}
      </div>
    </div>
  );
}

export default Orders;
