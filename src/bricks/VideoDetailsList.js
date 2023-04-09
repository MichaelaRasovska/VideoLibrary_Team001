import React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

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
              <b>{props.videoData.name}</b>
            </div>
            <div>
              <span className="text-muted">Žánr: </span>
              <b>{props.videoData.genre}</b>
            </div>
            <div>
              <span className="text-muted">Popis videa: </span>
              <b>{props.videoData.description}</b>
            </div>
            <div>
              <span className="text-muted">URL videa: </span>
              <b>{props.videoData.url}</b>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
