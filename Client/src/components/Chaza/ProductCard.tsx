import React, { useState, useEffect, use } from "react";
import { Col, Card, Button, Form } from "react-bootstrap";
import Image from "next/image";
import styles from "@/styles/products.module.css";
import { FiEdit } from "react-icons/fi";
import { Product } from "@/types/product";
import Loading from "../Loading";
import { useMutation } from "react-query";
import { updateProduct, deleteProduct } from "@/pages/api/product";
import Question from "../Question";
import Message from "../Message";

function ProductCard({ product }: { product: Product }) {
  const [productData, setProductData] = useState<Product>({
    _id: product._id.toString(),
    name: product.name.toString(),
    name_chaza: product.name_chaza.toString(),
    description: product.description.toString(),
    price: product.price,
    image: product.image.toString(),
    category: product.category,
    stock: product.stock,
    total_sales: product.total_sales,
  });
  const [editable, setEditable] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [message, setMessage] = useState("");
  const [acepted, setAcepted] = useState(false);
  const handleClosedQuestion = () => setShowQuestion(false);
  const handleShowQuestion = () => setShowQuestion(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => setShowMessage(true);
  const handleCloseMessage = () => setShowMessage(false);
  const [messageType, setMessageType] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (response) => {
      setMessage("El producto se actualizó correctamente");
      setMessageType("success");
      handleShowMessage();
      setLoading(false);
      setEditable(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    form.reportValidity();
    if (form.checkValidity() === false) {
      setValidated(true);
      setLoading(false);
    } else {
      updateProductMutation.mutate(productData);
    }
    setValidated(true);
  };

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      setMessage("El producto se eliminó correctamente");
      setMessageType("success");
      handleShowMessage();
      setLoading(false);
      setEditable(false);
      window.location.reload();
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (acepted) {
      setLoading(true);
      deleteProductMutation.mutate(productData._id.toString());
    }
  }, [acepted]);

  const handleDelete = () => {
    setMessage("El producto se eliminará permanentemente");
    handleShowQuestion();
  };

  return (
    <>
      <Question
        show={showQuestion}
        message={message}
        handleClose={handleClosedQuestion}
        setAcepted={setAcepted}
      ></Question>
      <Message
        show={showMessage}
        message={message}
        handleClose={handleCloseMessage}
        type={messageType}
      ></Message>
      {loading && <Loading></Loading>}
      <Col sm={6} md={4} xl={3} className="mb-5">
        <Card
          className={`${styles.product_card} m-auto`}
          style={{ minHeight: "450px" }}
        >
          <div className="text-center">
            {!editable ? (
              <Image
                src={product.image.toString()}
                alt={product.name.toString()}
                width={260}
                height={179}
              ></Image>
            ) : null}
            <div className="position-absolute top-0">
              <Button variant="success" onClick={() => setEditable(!editable)}>
                <FiEdit size={30}></FiEdit>
              </Button>
            </div>
          </div>

          <Card.Body>
            <div>
              <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group className="mb-1">
                  {editable ? <Form.Label>Nombre</Form.Label> : null}
                  <Form.Control
                    required
                    name="name"
                    type="text"
                    defaultValue={product.name.toString()}
                    disabled={!editable}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Nombre no valido
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  {editable ? <Form.Label>Descripción </Form.Label> : null}
                  <Form.Control
                    required
                    name="description"
                    as="textarea"
                    defaultValue={product.description.toString()}
                    disabled={!editable}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Descripción no valida
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  {editable ? <Form.Label>Precio</Form.Label> : null}
                  <Form.Control
                    required
                    name="price"
                    type="number"
                    defaultValue={product.price.toString()}
                    disabled={!editable}
                    min={50}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Precio no valido
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  {editable ? <Form.Label>Cantidad</Form.Label> : null}
                  <Form.Control
                    required
                    name="stock"
                    type="number"
                    defaultValue={product.stock.toString()}
                    disabled={!editable}
                    onChange={handleChange}
                    min={1}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Cantidad no valida
                  </Form.Control.Feedback>
                </Form.Group>
                {editable ? (
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 mt-5"
                  >
                    Guardar
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    className="w-100  mb-0"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                )}
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default ProductCard;
