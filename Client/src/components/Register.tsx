import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import { signupData } from "@/types/user";
import { signup, GoogleLogin } from "../pages/api/auth";
import cookie from "js-cookie";
import Loading from "./Loading";
import { useGoogleLogin } from "@react-oauth/google";

function Register({ loginMode }: { loginMode: "chaza" | "cliente" | "" }) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<signupData>({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      setShowError(false);
      setLoading(false);
      cookie.set("user-token", response.data, { expires: 1 });
      if (loginMode === "chaza") {
        window.location.href = "/chaza/home";
      } else {
        window.location.href = "/client/home";
      }
    },
    onError: (error: any) => {
      console.log(error);
      setShowError(true);
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
      signupMutation.mutate(formData);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const googleLoginMutation = useMutation({
    mutationFn: GoogleLogin,
    onSuccess: (response) => {
      signupMutation.mutate({
        username: response.email.split("@")[0],
        name: response.given_name,
        lastName: response.family_name,
        email: response.email,
        password: response.name + process.env.GOOGLE_PASS_KEY,
        phone: "",
      });
    },
    onError: (error: any) => {
      console.log(error);
      setLoading(false);
    },
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      googleLoginMutation.mutate(codeResponse.access_token);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
    },
    onNonOAuthError: (error) => {
      console.log(error);
      setLoading(false);
    },
  });

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <div className="">
        <Button
          size="lg"
          variant="light"
          className="ps-5 pe-5 border border-2  "
          onClick={() => {
            handleGoogleLogin();
            setLoading(true);
          }}
        >
          <FcGoogle size={30} />
          <span className="ms-3">Google</span>
        </Button>
      </div>
      <div className="mb-4 mt-4">Ó</div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-50 text-center m-auto"
      >
        <Form.Group className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Nombre de usuario"
            name="username"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Nombre de usuario no valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 ">
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            name="name"
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
            placeholder="Apellido"
            name="lastName"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Apellido no valido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Email no valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 ">
          <Form.Control
            required
            type="text"
            placeholder="Numero de celular"
            name="phone"
            onChange={handleChange}
            isInvalid={formData.phone.length !== 10}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Celular no valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 ">
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
        {showError ? (
          <p className="text-danger">Nombre de usuario ya existe</p>
        ) : null}
        <Button type="submit">Registrarse</Button>
      </Form>
    </>
  );
}

export default Register;
