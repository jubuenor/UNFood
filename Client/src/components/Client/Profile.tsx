import React, { useState } from "react";
import { User } from "@/types/user";
import { Form, Button } from "react-bootstrap";
import Loading from "../Loading";
import { useMutation } from "react-query";
import { updateUser } from "../../pages/api/user";
import Message from "../Message";

function Profile({ userData }: { userData: User }) {
  const [user, setUser] = useState<User>(userData);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => setShowMessage(true);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState<"success" | "danger">(
    "danger"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (response) => {
      setLoading(false);
      setMessage("Datos actualizados correctamente");
      setTypeMessage("success");
      handleShowMessage();
    },
    onError: (error: any) => {
      console.log(error);
      setLoading(false);
      setMessage("Error al actualizar los datos, revise su contraseña");
      setTypeMessage("danger");
      handleShowMessage();
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
      updateMutation.mutate(user);
    }
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Message
        show={showMessage}
        message={message}
        type={typeMessage}
        handleClose={handleCloseMessage}
      ></Message>
      <div className="p-5 mt-5 text-center">
        <h1>Datos del Usuario</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="text-center m-auto mt-5"
          style={{ maxWidth: "800px" }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombre de usuario"
              name="username"
              defaultValue={user.username}
              onChange={handleChange}
              disabled
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Nombre de usuario no valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>Nombre </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombre"
              name="name"
              defaultValue={user.name}
              onChange={handleChange}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Nombre no valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>Apellido </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Apellido"
              name="lastName"
              defaultValue={user.lastName}
              onChange={handleChange}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Apellido no valido
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 ">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Email no valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>Numero de Celular</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Numero de celular"
              name="phone"
              defaultValue={user.phone}
              onChange={handleChange}
              isInvalid={user.phone.length !== 10}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Celular no valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>
              Para actualizar los datos ingrese su contraseña
            </Form.Label>

            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Contraseña no valida
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Actualizar datos</Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
