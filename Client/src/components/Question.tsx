import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Question({
  message,
  show,
  handleClose,
  setAcepted,
}: {
  message: string;
  show: boolean;
  handleClose: () => void;
  setAcepted: (accepted: boolean) => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¿Estas seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setAcepted(true)}>
          Aceptar
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Atras
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Question;
