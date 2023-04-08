import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

const VideoDetailsList = () => {
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail videa</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div
        style={{ color: 'grey', cursor: 'pointer' }}
        size={1}
        onClick={handleShowModal}
      >
        detail videa
      </div>
    </>
  );
};

export default VideoDetailsList;
