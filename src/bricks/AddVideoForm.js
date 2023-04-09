import React from 'react';
import '../App.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

const AddVideoForm = (props) => {
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);
  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vyplňte údaje o videu:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addVideoForm">
            <label>
              Interpret:<input type="text"></input>
            </label>
            <label>
              Žánr:
              <select>
                <option value="default">Vyberte...</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="Opera">Opera</option>
                <option value="hip-hop">Hip-hop</option>
              </select>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Button
        style={{ marginLeft: '8px' }}
        ariant="primary"
        size="lg"
        type="submit"
        onClick={handleShowModal}
      >
        <Icon size={1} path={mdiPlus} color="white" /> Vložit video
      </Button>
    </>
  );
};

export default AddVideoForm;
