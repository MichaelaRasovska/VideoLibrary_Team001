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
import { Input } from './Input';
import { Textarea } from './Textarea';

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
              <Input
                type="text"
                validationMessage={nameValidation(formData.name)}
                errorMessage={errorMessage.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrorMessage({ ...errorMessage, name: '' });
                }}
              ></Input>
            </label>
            <label>
              Název videa:
              <Input
                type="text"
                validationMessage={titleValidation(formData.title)}
                errorMessage={errorMessage.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setErrorMessage({ ...errorMessage, title: '' });
                }}
              ></Input>
            </label>
            <label>
              Délka videa:
              <Input
                type="number"
                validationMessage={durationValidation(formData.duration)}
                errorMessage={errorMessage.duration}
                onChange={(e) => {
                  setFormData({ ...formData, duration: e.target.value });
                  setErrorMessage({ ...errorMessage, duration: '' });
                }}
              ></Input>
            </label>
            <label>
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
                <label>Pop</label>
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
                <label>Rock</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Opera</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Hip-hop</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Metal</label>
              </div>
              <div>
                <input type="checkbox" />
                <label>Jiné</label>
              </div>
            </label>
            <label>
              Popis:
              <Textarea
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              ></Textarea>
            </label>
            <label>
              Link na video:
              <Input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                  setErrorMessage({ ...errorMessage, url: '' });
                }}
              ></Input>
            </label>
            <label>
              Link na obrázek:
              <Input
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, picture: e.target.value });
                }}
              ></Input>
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
