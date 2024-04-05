import React from "react";
import styles from "@/styles/lista.chaza.module.css";
import Image from "next/image";
import Link from "next/link";
import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
import { Chaza } from "@/types/chaza";
import categorias from "@/utils/categoriesChaza";
import { useRouter } from "next/router";

function Chazas({ chazas }: { chazas: Chaza[] }) {
  const router = useRouter();

  const handleChazaClick = (chaza_name: string) => {
    router.push(`/client/chaza/${chaza_name}`);
  };

  const renderchazaList = chazas.map((chaza, index) => {
    return (
      <Col sm={12} md={6} xl={4} key={index}>
        <Card
          className={`${styles.chaza_card} m-auto w-100`}
          onClick={() => handleChazaClick(chaza.name.toString())}
        >
          <Card.Body>
            <div className="flex items-center">
              <div className="img_container">
                <Image
                  src={chaza.image.toString()}
                  alt={chaza.name.toString()}
                  fill
                ></Image>
              </div>
              <div className="flex flex-col ml-4">
                <h2 className="text-foreground/90">
                  {chaza.name.length > 32
                    ? chaza.name.substring(0, 32).concat("...")
                    : chaza.name}
                </h2>
                <p className="text-foreground/90">
                  {chaza.description.length > 145
                    ? chaza.description.substring(0, 145).concat("...")
                    : chaza.description}
                </p>
                <h3 className="text-medium text-foreground/80">
                  Categoria: {categorias[chaza.type]}
                </h3>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div className={`${styles.chazaList} p-3`}>
        <div className={`mb-5 mt-3`}>
          <Breadcrumb>
            <li className="breadcrumb-item">
              <Link href="/client/home"> UNFood</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/client/chazaList"> Chazas</Link>
            </li>
            <li className="breadcrumb-item active">Todo</li>
          </Breadcrumb>
        </div>
        <div>
          <h1>Chazas</h1>
        </div>

        <Row className="gx-0">{renderchazaList}</Row>
      </div>
    </>
  );
}

export default Chazas;
