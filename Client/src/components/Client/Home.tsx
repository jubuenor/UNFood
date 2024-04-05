import React from "react";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import { Col, Row, Button } from "react-bootstrap";
import Link from "next/link";
import { numbers } from "@/types/chaza";

function Home({ numbers }: { numbers: numbers }) {
  return (
    <div className={`${styles.home} h-100`}>
      <section className="p-5">
        <h1>
          UNFood <span>Clientes</span>
        </h1>
        <Row>
          <Col md={12} lg={4}>
            <div className={styles.promotion}>
              <p className="text-light">Pide</p>
              <p>Paga</p>
              <p className="text-light">Recoge</p>
            </div>
            <div className={`${styles.homebtn}`}>
              <Link className="btn btn-success btn-lg" href="chazas">
                {" "}
                ! Compra ahora !
              </Link>
            </div>
          </Col>
          <Col md={12} lg={8}>
            <div className={`${styles.fondo} text-center`}>
              <Image
                src="/images/fondo1.png"
                alt="fondo"
                fill
                className={`${styles.fondo}`}
              ></Image>
            </div>
          </Col>
        </Row>
      </section>
      <div
        className={`${styles.counter} position-absolute w-100  d-flex justify-content-center text-light p-2 bottom-0`}
      >
        <div>
          <Image
            src="/images/tienda.png"
            alt="tienda"
            width={60}
            height={42}
          ></Image>
          <p className="fs-3 text-light ms-3 me-3">
            Más de <span className="fs-1">{numbers.chazas}</span> Chazas
          </p>
        </div>

        <div className="vr opacity-100"></div>
        <div>
          <Image
            className="ms-3"
            src="/images/donut.png"
            alt="dona"
            width={60}
            height={42}
          ></Image>
          <p className="fs-3 text-light ms-3">
            Más de <span className="fs-1">{numbers.products}</span> Productos{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
