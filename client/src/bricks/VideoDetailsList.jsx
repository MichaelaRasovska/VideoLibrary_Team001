import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const VideoDetailsList = (props) => {
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail videa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <span className="text-muted">Interpret: </span>
              <b>{props.video.name}</b>
            </div>
            <div>
              <span className="text-muted">Název videa: </span>
              <b>{props.video.title}</b>
            </div>
            <div>
              <span className="text-muted">Délka videa: </span>
              <b>{props.video.duration}</b>
            </div>
            <div>
              <span className="text-muted">Žánry: </span>
              <b>
                {props.video.genres.map((genre) => {
                  return genre.label + ', ';
                })}
              </b>
            </div>
            <div>
              <span className="text-muted">Popis videa: </span>
              <b>{props.video.description}</b>
            </div>
            <div>
              <span className="text-muted">URL videa: </span>
              <b>{props.video.url}</b>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary">Smazat</Button>
          <Button variant="outline-primary">Upravit</Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{ color: 'grey', cursor: 'pointer' }}
        size={1}
        onClick={handleShowModal}
      >
        Detail videa
      </div>
    </>
  );
};

export default VideoDetailsList;
