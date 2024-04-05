import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Row } from "react-bootstrap";
import styles from "../../styles/register.module.css";
import { GoogleMap, useLoadScript, MarkerF,  } from "@react-google-maps/api";
import { Location } from "@/types/location";

function ModalMap({
  show,
  handleClose,
  currentLocation,
  setCurrentLocation,
}: {
  show: boolean;
  handleClose: () => void;
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const center:Location= { lat: 4.636312349308707, lng: -74.08334255218506 };
  const zoom = 16;
  const options = {
    minZoom: 16,
    restriction: {
      latLngBounds: {
        north: 4.6431,
        east: -74.0789,
        west: -74.0895,
        south: 4.631,
      },
    },
  };

  const renderMarkers = () => {
    return (
      <MarkerF
        position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
      />
    );
  };
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
                onClick={(e) => {
                  if (e && e.latLng) {
                    setCurrentLocation({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                  }
                }}
                options={options}
              >
                <div>{renderMarkers()}</div>
              </GoogleMap>
            </div>
          ) : (
            <div>Cargando mapa</div>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button size="sm" onClick={handleClose}>
          Seleccionar ubicación
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMap;
