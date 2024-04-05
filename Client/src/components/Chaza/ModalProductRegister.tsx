import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Loading from "../Loading";
import { ProductCreate } from "@/types/product";
import { useMutation } from "react-query";
import { createProduct } from "@/pages/api/product";
import { LuPackagePlus } from "react-icons/lu";
import categories from "@/utils/categoriesProduct";
import Message from "../Message";

function ModalProductRegister({
  show,
  handleClose,
  chazaId,
}: {
  show: boolean;
  handleClose: () => void;
  chazaId: string;
}) {
  const [formData, setFormData] = useState<ProductCreate>({
    chaza_id: chazaId,
    name: "",
    description: "",
    price: 0,
    category: 0,
    image: "",
    stock: 1,
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleShowMessage = () => setShowMessage(true);
  const handleCloseMessage = () => setShowMessage(false);

  const handleMessage = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
    handleShowMessage();
  };

  const registerProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      console.log(response);
      setLoading(false);
      handleMessage("Producto registrado con exito", "success");
      window.location.reload();
    },
    onError: (error: any) => {
      setLoading(false);
      handleMessage("Error al registrar el producto", "danger");
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setLoading(false);
      setValidated(true);
    } else {
      registerProductMutation.mutate(formData);
    }

    setValidated(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderCategories = Object.keys(categories).map((key, index) => {
    return (
      <option key={key} value={key}>
        {categories[key]}
      </option>
    );
  });
  return (
    <>
      <Message
        message={message}
        type={messageType}
        show={showMessage}
        handleClose={handleCloseMessage}
      ></Message>
      {loading ? <Loading></Loading> : null}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Registro de Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 text-center">
          <div className="mb-3">
            <LuPackagePlus size={70}></LuPackagePlus>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="w-100 text-center m-auto"
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Control
                required
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedImage = event.target.files
                    ? event.target.files[0]
                    : null;

                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    image: selectedImage,
                  }));
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Imagen no valida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                isInvalid={formData.price < 50}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                defaultValue={1}
                onChange={handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="category"
                defaultValue={0}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const { name, value } = event.target;
                  const prevData = formData;
                  prevData.category = parseInt(value);
                  setFormData(prevData);
                }}
                isInvalid={formData.category === 0}
              >
                <option value={0}>Selecciona una categoria</option>
                {renderCategories}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Tipo de chaza no valido
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Registrar producto</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalProductRegister;
