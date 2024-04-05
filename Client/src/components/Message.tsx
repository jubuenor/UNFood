import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Message({
  message,
  type,
  show,
  handleClose,
}: {
  message: string;
  type: string;
  show: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title
          className={`${type === "success" ? "text-success" : "text-danger"}`}
        >
          {type === "success" ? "Operación exitosa" : "Error"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={type} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Message;
