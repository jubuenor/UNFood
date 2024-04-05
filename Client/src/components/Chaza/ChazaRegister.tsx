import React, { useState, useEffect } from "react";
import styles from "../../styles/register.module.css";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import { ChazaCreate } from "@/types/chaza";
import metodosPago from "@/utils/paymentMethods";
import categorias from "@/utils/categoriesChaza";
import { useMutation } from "react-query";
import Loading from "../Loading";
import { createChaza } from "@/pages/api/chaza";
import ModalMap from "./ModalMap";
import fetchLocationName from "@/utils/geocoding";
import { Location } from "@/types/location";

function Chazaregister({ id }: { id: string }) {
  const center: Location = { lat: 4.636312349308707, lng: -74.08334255218506 };

  const [formData, setFormData] = useState<ChazaCreate>({
    owner: id,
    name: "",
    description: "",
    type: -1,
    phone: "",
    address: "",
    image: "",
    payment_method: [],
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPayment, setErrorPayment] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location>(center);
  const [locationName, setLocationName] = useState<string>("");

  const registerChazaMutation = useMutation({
    mutationFn: createChaza,
    onSuccess: (response) => {
      setLoading(false);
      window.location.href = "home";
    },
    onError: (error: any) => {
      setLoading(false);
    },
  });
  const handleCloseMap = () => {
    setShowMap(false);
    handleChange({
      target: {
        name: "address",
        value: `${currentLocation.lat},${currentLocation.lng}`,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setLoading(false);
      setValidated(true);
    } else {
      if (formData.payment_method.length === 0) {
        setErrorPayment(true);
        setLoading(false);
        return;
      }
      registerChazaMutation.mutate(formData);
    }

    setValidated(true);
  };
  const renderCategories = Object.keys(categorias).map((key, index) => {
    return (
      <option key={key} value={key}>
        {categorias[key]}
      </option>
    );
  });
  const renderPaymentMethods = Object.keys(metodosPago).map((key, index) => {
    return (
      <Form.Check
        className="text-primary ms-3"
        key={key}
        label={metodosPago[key]}
        value={metodosPago[key]}
        onChange={(event: React.ChangeEvent) => {
          const isChecked = (event.target as HTMLInputElement).checked;
          const prevData = formData;
          if (!isChecked) {
            if (prevData.payment_method.includes(parseInt(key))) {
              prevData.payment_method.splice(
                prevData.payment_method.indexOf(parseInt(key))
              );
              setFormData(prevData);
            }
            return;
          }
          prevData.payment_method.push(parseInt(key));
          setFormData(prevData);
        }}
      ></Form.Check>
    );
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const renderLocationName = async () => {
    const name = await fetchLocationName(currentLocation);
    setLocationName(name);
  };

  useEffect(() => {
    renderLocationName();
  }, [currentLocation]);
  return (
    <>
      {loading ? <Loading></Loading> : null}
      <ModalMap
        show={showMap}
        handleClose={handleCloseMap}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      ></ModalMap>
      <div className={styles["form-container"]}>
        <img
          src="/images/chazafondo.PNG"
          alt="Background"
          className={styles["background-image"]}
        />

        <div className={styles["form-box"]}>
          <Image
            src="/images/logoUNFood.png"
            alt="logoUNFood"
            width={327}
            height={200}
          ></Image>
          <h1>Registro de Chaza</h1>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="w-10 text-center m-auto"
          >
            <Form.Group className="mb-3 ">
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Nombre de Chaza"
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Nombre no valido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Control
                required
                type="text"
                placeholder="Descripcion"
                name="description"
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Descripcion no valida
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Control
                required
                type="text"
                name="phone"
                placeholder="Telefono"
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Telefono no valido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Control
                required
                type="text"
                placeholder="Selecciona ubicacion"
                name="location"
                onChange={handleChange}
                onClick={() => handleShowMap()}
                value={locationName}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Descripcion no valida
              </Form.Control.Feedback>
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
            <Form.Group className="mb-3 ">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="type"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const { name, value } = event.target;
                  const prevData = formData;
                  prevData.type = parseInt(value);
                  setFormData(prevData);
                }}
                defaultValue={0}
                isInvalid={formData.type === -1 || formData.type === 0}
              >
                <option value={0}>Selecciona una categoria</option>
                {renderCategories}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                Tipo de chaza no valido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="p-3">
              <Form.Label> Metodos de pago</Form.Label>
              <div className={`${styles.payment}`}>{renderPaymentMethods}</div>

              <p className={`text-danger ${!errorPayment ? "d-none" : ""}`}>
                Selecciona al menos un metodo de pago
              </p>
            </Form.Group>

            <Button type="submit">Registrarse</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Chazaregister;
