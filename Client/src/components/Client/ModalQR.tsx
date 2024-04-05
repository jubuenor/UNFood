import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Row, Form, Image } from "react-bootstrap";
import styles from "../../styles/register.module.css";

function ModalQR({
  show,
  handleClose,
  link,
}: {
  show: boolean;
  handleClose: () => void;
  link: string;
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className={`${styles.GoogleMap}`}
    >
      <Modal.Header closeButton>QR Pagos</Modal.Header>
      <Modal.Body>
        <Image src={link} fluid></Image>
      </Modal.Body>
    </Modal>
  );
}

export default ModalQR;
