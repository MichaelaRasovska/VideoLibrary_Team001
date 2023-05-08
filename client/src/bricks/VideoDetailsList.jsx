import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import UpdateVideoForm from './UpdateVideoForm';
import DeleteModal from './DeleteModal';

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
              <b>{props.video.genres.map((genre) => genre.name).join(', ')}</b>
            </div>
            <div>
              <span className="text-muted">Popis videa: </span>
              <b>{props.video.description}</b>
            </div>
            <div>
              <span className="text-muted">URL videa: </span>
              <a href={props.video.url}>{props.video.url}</a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <DeleteModal
            key={props.video.id}
            video={props.video}
            handleReload={props.handleReload}
          />
          <UpdateVideoForm
            key={props.video.id}
            video={props.video}
            genreData={props.genreData}
            handleReload={props.handleReload}
          />
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
