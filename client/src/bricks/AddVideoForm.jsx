import React from 'react';
import '../App.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import {
  nameValidation,
  titleValidation,
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
  picture: '',
};

export let newEntry = false;
export let newData = '';

const AddVideoForm = (props) => {
  //modal states
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  //form states
  const [formData, setFormData] = useState(defaultData);
  const [errorMessage, setErrorMessage] = useState(defaultData);

  //Validations

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
    if (requiredValidation(formData.url) !== null) {
      isValid = false;
    }
    if (requiredValidation(formData.picture) !== null) {
      isValid = false;
    }

    setErrorMessage({
      name: nameValidation(formData.name),
      title: titleValidation(formData.title),
      duration: durationValidation(formData.duration),
      genre: requiredValidation(formData.genre),
      description: descriptionValidation(formData.description),
      url: requiredValidation(formData.url),
      picture: requiredValidation(formData.picture),
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm() === true) {
      newData = [...props.videoList, formData];
      setFormData(defaultData);
      handleCloseModal();
      newEntry = true;
      console.log(newData);
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
              />
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
              />
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
              />
              minut
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
            </label>
            <label>
              Popis:
              <Textarea
                validationMessage={descriptionValidation(formData.description)}
                errorMessage={errorMessage.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  setErrorMessage({ ...errorMessage, description: '' });
                }}
              />
            </label>
            <label>
              Link na video:
              <Input
                type="text"
                validationMessage={requiredValidation(formData.url)}
                errorMessage={errorMessage.url}
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                  setErrorMessage({ ...errorMessage, url: '' });
                }}
              />
            </label>
            <label>
              Link na obrázek:
              <Input
                validationMessage={requiredValidation(formData.picture)}
                errorMessage={errorMessage.picture}
                onChange={(e) => {
                  setFormData({ ...formData, picture: e.target.value });
                  setErrorMessage({ ...errorMessage, picture: '' });
                }}
              />
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
