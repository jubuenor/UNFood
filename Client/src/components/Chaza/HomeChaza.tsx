import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/home.chaza.module.css";
import { FiEdit } from "react-icons/fi";
import { Button, Form } from "react-bootstrap";
import { BiMap, BiSolidCategory } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import Stars from "../Stars";
import { ChazaUpdate, Chaza } from "@/types/chaza";
import metodosPago from "@/utils/paymentMethods";
import categorias from "@/utils/categoriesChaza";
import { useMutation } from "react-query";
import Loading from "../Loading";
import { updateChaza } from "@/pages/api/chaza";
import Message from "../Message";
import ModalMap from "./ModalMap";
import QRCode from "qrcode";
import { BsQrCode } from "react-icons/bs";
import ModalQrChaza from "./ModalQRChaza";

import ModalAddQR from "./ModalAddQR";

function HomeChaza({ chazaData }: { chazaData: Chaza }) {
  const [showAddQR, setshowAddQR] = useState(false);
  const handleshowAddQR = () => {
    setshowAddQR(true);
  };
  const handleClose = () => {
    setshowAddQR(false);
  };
  const [editable, setEditable] = useState(false);
  const [chaza, setChaza] = useState<ChazaUpdate>({
    owner: chazaData.owner,
    description: chazaData.description,
    type: chazaData.type,
    address: chazaData.address,
    phone: chazaData.phone,
    payment_method: chazaData.payment_method,
  });

  const [src, setSrc] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const handleCloseQR = () => setShowQR(false);
  const handleShowQR = () => setShowQR(true);

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPayment, setErrorPayment] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: Number(chazaData.address.toString().split(",")[0]),
    lng: Number(chazaData.address.toString().split(",")[1]),
  });

  const handleShowMessage = () => setShowMessage(true);
  const handleCloseMessage = () => setShowMessage(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);

    setChaza((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleCloseMap = () => {
    handleChange({
      target: {
        name: "address",
        value: `${currentLocation.lat},${currentLocation.lng}`,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setShowMap(false);
  };
  const handleShowMap = () => {
    setShowMap(true);
  };

  const renderPaymentMethods = Object.keys(metodosPago).map((key, index) => {
    return (
      <Form.Check
        className="text-primary ms-3"
        key={key}
        label={metodosPago[key]}
        disabled={!editable}
        value={metodosPago[key]}
        defaultChecked={chaza.payment_method.includes(parseInt(key))}
        onChange={(event: React.ChangeEvent) => {
          const isChecked = (event.target as HTMLInputElement).checked;
          const prevData = chaza;
          if (!isChecked) {
            if (prevData.payment_method.includes(parseInt(key))) {
              prevData.payment_method.splice(
                prevData.payment_method.indexOf(parseInt(key))
              );
              setChaza(prevData);
            }
            return;
          }
          prevData.payment_method.push(parseInt(key));
          setChaza(prevData);
        }}
      ></Form.Check>
    );
  });

  const renderCategories = Object.keys(categorias).map((key, index) => {
    return (
      <option key={key} value={key}>
        {categorias[key]}
      </option>
    );
  });

  const handleMessage = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
    handleShowMessage();
  };

  const updateChazaMutation = useMutation({
    mutationFn: updateChaza,
    onSuccess: (data) => {
      setLoading(false);
      handleMessage("Chaza actualizada", "success");
    },
    onError: (error) => {
      handleMessage("Error al actualizar la chaza", "danger");
      setLoading(false);
      console.log(error);
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
      if (chaza.payment_method.length === 0) {
        setErrorPayment(true);
        setLoading(false);
        return;
      }
      console.log(chaza);
      updateChazaMutation.mutate(chaza);
    }
    setValidated(true);
  };

  const generateQR = () => {
    QRCode.toDataURL(
      `https://client-inky-delta.vercel.app/client/chaza/${chazaData.name}`
    ).then(setSrc);
    handleShowQR();
  };

  return (
    <>
      <ModalAddQR
        show={showAddQR}
        handleClose={handleClose}
        qrActual={chazaData.qr?.toString() ?? ""}
      ></ModalAddQR>
      <ModalMap
        show={showMap}
        handleClose={handleCloseMap}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      ></ModalMap>
      <ModalQrChaza
        show={showQR}
        handleClose={handleCloseQR}
        src={src}
      ></ModalQrChaza>
      <Message
        message={message}
        type={messageType}
        show={showMessage}
        handleClose={handleCloseMessage}
      ></Message>
      {loading ? <Loading></Loading> : null}
      <div className=" w-100 h-100 overflow-auto">
        <div className={styles.img_container}>
          <Image src={chazaData.image.toString()} alt="logo" fill></Image>
        </div>
        <div className="p-4">
          <div className="d-flex justify-content-between mb-3">
            <div className={`${styles.title}`}>
              <h1 className="me-3">{chazaData.name}</h1>
              <Stars number={chazaData.score}></Stars>
            </div>
            <div>
              <Button variant="danger" onClick={() => setEditable(!editable)}>
                <FiEdit size={30}></FiEdit>
              </Button>
              <Button variant="danger" onClick={generateQR}>
                <BsQrCode size={30} />
                <span className="ms-2">Chaza</span>
              </Button>
              <Button
                onClick={() => {
                  handleshowAddQR();
                }}
              >
                <BsQrCode size={30} />
                <span className="ms-2">Pagos</span>
              </Button>
            </div>
          </div>
          <Form
            noValidate={false}
            validated={validated}
            onSubmit={handleSubmit}
            className={`${styles.info} mb-3`}
          >
            <Form.Group className="mb-3">
              <Form.Control
                required
                name="description"
                as="textarea"
                defaultValue={chazaData.description?.toString()}
                disabled={!editable}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Descripción no valida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex align-items-center me-2">
                <BiMap size={25}></BiMap>
                Ubicación
              </Form.Label>
              <Form.Control
                required
                name="address"
                type="text"
                defaultValue={`${currentLocation.lat},${currentLocation.lng}`}
                disabled={!editable}
                onChange={handleChange}
                onClick={() => handleShowMap()}
                value={`${currentLocation.lat},${currentLocation.lng}`}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Direccion no valida
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex align-items-center me-2">
                <BsFillChatDotsFill size={25}></BsFillChatDotsFill>
                Telefono.
              </Form.Label>
              <Form.Control
                required
                name="phone"
                type="text"
                defaultValue={chazaData.phone?.toString()}
                disabled={!editable}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Telefono no valido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex align-items-center me-2">
                <BiSolidCategory size={25}></BiSolidCategory>
                Categoria
              </Form.Label>
              <Form.Select
                name="type"
                disabled={!editable}
                defaultValue={chazaData.type}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const { name, value } = event.target;
                  const prevData = chaza;
                  prevData.type = parseInt(value);
                  setChaza(prevData);
                }}
              >
                {renderCategories}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Label className="d-flex align-items-center me-2">
                <MdPayment size={25}></MdPayment>
                Med.Pago
              </Form.Label>
              <div className={`${styles.payment}`}>{renderPaymentMethods}</div>
            </Form.Group>
            <p className={`text-danger ${!errorPayment ? "d-none" : ""}`}>
              Debe seleccionar al menos un metodo de pago
            </p>
            <Button type="submit" disabled={!editable}>
              Guardar
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default HomeChaza;
