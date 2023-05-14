import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {
  const [isModalShown, setShow] = useState(false);
  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  const handleSubmit = async () => {
    await fetch(`http://localhost:8000/videos/${props.video.id}`, {
      method: 'DELETE',
    });
    props.handleReload();
    handleCloseModal();
  };

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Smazat video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Opravdu si přejete smazat toto video?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Smazat
          </Button>
          <Button variant="outline-secondary">Ponechat</Button>
        </Modal.Footer>
      </Modal>
      <Button variant="outline-secondary" onClick={handleShowModal}>
        Smazat video
      </Button>
    </>
  );
};

export default DeleteModal;
