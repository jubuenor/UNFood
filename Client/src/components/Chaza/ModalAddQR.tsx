import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Row, Form } from "react-bootstrap";
import { qrCreate } from "@/types/chaza";
import { uploadQR } from "@/pages/api/chaza";
import { getToken } from "@/pages/api/token";
import { useMutation } from "react-query";
import styles from "../../styles/register.module.css";
import Loading from "../Loading";
import Message from "../Message";
import Image from "next/image";

function ModalAddQR({
  show,
  handleClose,
  qrActual,
}: {
  show: boolean;
  handleClose: () => void;
  qrActual: string;
}) {
  const [qr, setQr] = useState<qrCreate>({
    _id: "",
    qr: "",
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => setShowMessage(true);
  const handleCloseMessage = () => setShowMessage(false);

  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  const uploadQRMutation = useMutation({
    mutationFn: uploadQR,
    onSuccess: (response) => {
      setMessage("QR agregado correctamente");
      setTypeMessage("success");
      handleShowMessage();
      setLoading(false);
    },
    onError: (error: any) => {
      setMessage("Error al agregar QR");
      setTypeMessage("danger");
      handleShowMessage();
      setLoading(false);
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
      qr._id = getToken()?.id ?? "";
      uploadQRMutation.mutate(qr);
    }

    setValidated(true);
  };

  return (
    <>
      <Message
        show={showMessage}
        message={message}
        type={typeMessage}
        handleClose={handleCloseMessage}
      ></Message>
      {loading && <Loading></Loading>}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        className={`${styles.GoogleMap}`}
      >
        <Modal.Header closeButton>Agregar QR Pagos</Modal.Header>
        <Modal.Body>
          {qrActual !== "" ? (
            <>
              <p>Qr actual:</p>
              <div className="position-relative" style={{ minHeight: "500px" }}>
                <Image src={qrActual} alt="qr" fill></Image>
              </div>
            </>
          ) : (
            <p>Qr no encontrado</p>
          )}
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="w-100 text-center m-auto"
          >
            <Form.Group className="mb-3 ">
              <Form.Label>
                Agrega o actualiza un código QR para que tus clientes puedan
                pagar con <span style={{ color: "#a63c6d" }}>Nequi</span>
              </Form.Label>
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
                  console.log(selectedImage);

                  setQr((prevFormData) => ({
                    ...prevFormData,
                    qr: selectedImage,
                  }));
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Imagen no valida
              </Form.Control.Feedback>
              <Modal.Footer className="d-flex justify-content-center">
                <Button type="submit">Guardar</Button>
              </Modal.Footer>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAddQR;
