import React, { useState } from "react";
import Image from "next/image";
import { Card, Row, Col, Breadcrumb } from "react-bootstrap";
import ModalProductDetail from "./ModalProductDetail";
import styles from "@/styles/products.module.css";
import { Product } from "@/types/product";
import currencyFormater from "@/utils/currency";
import { BsCartPlusFill } from "react-icons/bs";
import { addProductToCart } from "@/utils/cart";
import Message from "@/components/Message";

function Products({ products }: { products: Product[] }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSHowDetails = (product: Product) => {
    setProductSelected(product);
    setShowDetails(true);
  };

  const [productSelected, setProductSelected] = useState<Product>(products[0]);

  const handelAddProductToCart = (product: Product) => {
    if (addProductToCart(product.name_chaza.toString(), product, 1)) {
      setMessage("Producto agregado al carrito");
      setType("success");
      handleShow();
    } else {
      setMessage("Producto ya agregado al carrito");
      setType("warning");
      handleShow();
    }
  };

  const renderProducts = products.map((product, index) => {
    return (
      <Col sm={6} md={6} xl={3} className="mb-5 " key={index}>
        <Card className={`${styles.product_card} ${styles.pointer} m-auto`}>
          <div>
            <Image
              src={product.image.toString()}
              alt={product.name.toString()}
              width={260}
              height={179}
            ></Image>
            <div className="position-absolute top-0">
              <button
                className="btn btn-light  rounded-0"
                onClick={() => handelAddProductToCart(product)}
              >
                <BsCartPlusFill></BsCartPlusFill>
              </button>
            </div>
          </div>
          <Card.Body
            className={styles.product_card_body}
            onClick={() => handleSHowDetails(product)}
          >
            <div>
              <h5>
                {product.name.length > 22
                  ? product.name.substring(0, 22).concat("...")
                  : product.name}
              </h5>
              <Card.Text>
                {product.description.length > 120
                  ? product.description.substring(0, 120).concat("...")
                  : product.description}
              </Card.Text>
            </div>
            <h1 className="mt-5">{currencyFormater.format(product.price)}</h1>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <Message
        show={show}
        handleClose={handleClose}
        message={message}
        type={type}
      ></Message>
      <ModalProductDetail
        show={showDetails}
        handleClose={handleCloseDetails}
        product={productSelected}
      ></ModalProductDetail>
      <div className={`${styles.products} overflow-auto`}>
        <Row className="gx-0 w-100">{renderProducts}</Row>
      </div>
    </>
  );
}

export default Products;
