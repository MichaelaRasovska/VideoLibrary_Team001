import React from 'react';
import '../App.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import videoData from '../data/videoData';
import {
  nameValidation,
  titleValidation,
  linkValidation,
  requiredValidation,
  descriptionValidation,
  durationValidation,
} from './validations';

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

export let newVideoData = [];
export let newFormState = false;

const AddVideoForm = (props) => {
  //modal states
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  //form states
  const [formData, setFormData] = useState(defaultData);
  const [errorMessage, setErrorMessage] = useState(defaultData);

  const validateForm = () => {
    let isValid = true;
    if (nameValidation(formData.name) !== null) {
      isValid = false;
    }
    if (titleValidation(formData.title) !== null) {
      isValid = false;
    }
    if (durationValidation(formData.duration) !== null) {
      isValid = false;
    }
    if (descriptionValidation(formData.description) !== null) {
      isValid = false;
    }
    if (requiredValidation(formData.genre) !== null) {
      isValid = false;
    }
    if (linkValidation(formData.url) !== null) {
      isValid = false;
    }
    if (linkValidation(formData.picture) !== null) {
      isValid = false;
    }

    setErrorMessage({
      name: nameValidation(formData.name),
      title: titleValidation(formData.title),
      duration: durationValidation(formData.duration),
      genre: requiredValidation(formData.genre),
      description: descriptionValidation(formData.description),
      url: linkValidation(formData.url),
      picture: linkValidation(formData.picture),
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm() === true) {
      videoData.push(formData);
      setFormData(defaultData);
      handleCloseModal();
      newVideoData = videoData;
      newFormState = true;
    }
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
                validationMessage={nameValidation(formData.name)}
                errorMessage={errorMessage.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrorMessage({ ...errorMessage, name: '' });
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
            <label htmlFor="">
              Vyber odpovídající žánry:
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      genre: 'pop',
                    });
                  }}
                />
                <label for="pop">Pop</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      genre: 'rock',
                    });
                  }}
                />
                <label for="rock">Rock</label>
              </div>
              <div>
                <input type="checkbox" />
                <label for="opera">Opera</label>
              </div>
              <div>
                <input type="checkbox" />
                <label for="hip-hop">Hip-hop</label>
              </div>
              <div>
                <input type="checkbox" />
                <label for="metal">Metal</label>
              </div>
              <div>
                <input type="checkbox" />
                <label for="jine">Jiné</label>
              </div>
            </label>
            <label>
              Popis:
              <textarea
                rows="6"
                cols="30"
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              ></textarea>
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
            <label>
              Link na obrázek:
              <input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, picture: e.target.value });
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
