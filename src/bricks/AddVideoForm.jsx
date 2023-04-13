import React from 'react';
import '../App.css';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import videoData from '../data/videoData';

//data
const defaultData = {
  id: '',
  name: '',
  title: '',
  duration: '',
  description: '',
  genre: '',
  url: '',
};

const AddVideoForm = (props) => {
  //modal states
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  //form states
  const [formData, setFormData] = useState(defaultData);
  const [formFilled, setFormFilled] = useState(false);

  /*useEffect(() => {
    return <VideoList videoList={videoData} />;
  }, [formFilled]);*/

  const handleSubmit = async () => {
    videoData.push(formData);
    setFormFilled(true);
    console.log(formFilled);
    console.log(videoData);
  };
  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vyplňte údaje o videu:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addVideoForm">
            <label>
              Interpret:
              <input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              ></input>
            </label>
            <label>
              Název videa:
              <input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
              ></input>
            </label>
            <label>
              Délka videa:
              <input
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, duration: e.target.value });
                }}
              ></input>
            </label>
            <label>
              Žánr:
              <select
                onChange={(e) => {
                  setFormData({ ...formData, genre: e.target.value });
                }}
              >
                <option value="default">Vyberte...</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="Opera">Opera</option>
                <option value="hip-hop">Hip-hop</option>
              </select>
            </label>
            <label>
              Popis:
              <input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              ></input>
            </label>
            <label>
              Link na video:
              <input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                }}
              ></input>
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary">Vymazat</Button>
          <Button
            variant="outline-primary"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Vložit
          </Button>
        </Modal.Footer>
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
