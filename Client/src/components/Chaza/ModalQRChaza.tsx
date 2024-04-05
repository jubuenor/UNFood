import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";

function ModalQrChaza({
  src,
  show,
  handleClose,
}: {
  src: string;
  show: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Qr Chaza</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          minHeight: "500px",
        }}
      >
        <Image src={src} alt="qrCode" fill></Image>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalQrChaza;
