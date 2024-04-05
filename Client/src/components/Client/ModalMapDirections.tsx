import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row } from "react-bootstrap";
import styles from "../../styles/register.module.css";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

function ModalMapDirections({
  show,
  handleClose,
  directionResponse,
}: {
  show: boolean;
  handleClose: () => void;
  directionResponse: any;
}) {

  
  const center = { lat: 4.636312349308707, lng: -74.08334255218506 };
  const zoom = 16;
  const options = {
    minZoom: zoom,
    estriction: {
      latLngBounds: {
        north: 4.6431,
        east: -74.0789,
        west: -74.0895,
        south: 4.631,
      },
    },
    mapTypeControl: false,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className={`${styles.GoogleMap}`}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          {isLoaded ? (
            <div
              className='className="d-flex justify-content-center'
              style={{ height: "40vh", width: "100%" }}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                zoom={zoom}
                center={center}
                options={options}
              >
                {directionResponse && (
                  <DirectionsRenderer directions={directionResponse} />
                )}
              </GoogleMap>
            </div>
          ) : (
            <div>Something wrong happnened!</div>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMapDirections;
