import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "@/styles/ModalOpinions.module.css";
import { useMutation } from "react-query";
import { addComment } from "@/pages/api/chaza";
import { comment } from "@/types/chaza";
import { getToken } from "@/pages/api/token";
import Stars from "../Stars";
import Loading from "../Loading";

function ModalOpinions({
  show,
  handleClose,
  id,
  comments,
}: {
  show: boolean;
  handleClose: () => void;
  id: string;
  comments: comment[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [stars, setStars] = useState<number>(1);
  const [comment, setComment] = useState<comment>({
    comment: "",
    calification: 1,
    date: new Date().toDateString(),
    user: getToken()?.username ?? "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComment((prevComment) => {
      return {
        ...prevComment,
        calification: stars,
      };
    });
  }, [stars]);

  const registerOpinionMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setLoading(false);
      setShowForm(false);
      setValidated(false);
    },
    onError: () => {
      setLoading(false);
      setShowForm(false);
      setValidated(false);
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
      registerOpinionMutation.mutate({
        id: id,
        comment: comment,
      });
      comments.push(comment);
    }
    setValidated(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setComment((prevComment) => {
      return {
        ...prevComment,
        [name]: value,
      };
    });
  };

  const renderComments = comments.map((comment, index) => (
    <Card key={index}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <p className="fs-4 m-0">
            <strong>{comment.user}</strong>
          </p>
          <Stars number={comment.calification}></Stars>
        </div>

        <p>{comment.date}</p>
      </Card.Header>

      <Card.Body>
        <p>{comment.comment}</p>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="h-100"
      >
        <Modal.Header closeButton>
          <Modal.Title>Opiniones</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-visible">
          {comments.length === 0 ? (
            <h3>Se el primero en comentar!</h3>
          ) : (
            renderComments
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          {showForm ? (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="w-100 d-flex justify-content-between"
            >
              <Form.Group>
                <Form.Control
                  required
                  name="comment"
                  as="textarea"
                  placeholder="Danos tu opinión"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <div
                className={`${styles.stars} d-flex flex-row-reverse align-items-center `}
              >
                <div className={`${styles.star1}`} onClick={() => setStars(5)}>
                  <AiFillStar
                    size={30}
                    color={`${stars >= 5 ? "yellow" : ""}`}
                  ></AiFillStar>
                </div>
                <div className={`${styles.star2}`} onClick={() => setStars(4)}>
                  <AiFillStar
                    size={30}
                    color={`${stars >= 4 ? "yellow" : ""}`}
                  ></AiFillStar>
                </div>
                <div className={`${styles.star3}`} onClick={() => setStars(3)}>
                  <AiFillStar
                    size={30}
                    color={`${stars >= 3 ? "yellow" : ""}`}
                  ></AiFillStar>
                </div>
                <div className={`${styles.star4}`} onClick={() => setStars(2)}>
                  <AiFillStar
                    size={30}
                    color={`${stars >= 2 ? "yellow" : ""}`}
                  ></AiFillStar>
                </div>
                <div className={`${styles.star5}`} onClick={() => setStars(1)}>
                  <AiFillStar
                    size={30}
                    color={`${stars >= 1 ? "yellow" : ""}`}
                  ></AiFillStar>
                </div>
              </div>
              <div className="d-flex flex-column">
                <Button variant="success" type="submit" className="mb-2">
                  Publicar
                </Button>
                <Button variant="danger" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </Form>
          ) : (
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              Publicar comentario
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalOpinions;
