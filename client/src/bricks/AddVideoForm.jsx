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
  descriptionValidation,
  durationValidation,
  videoLinkValidation,
  pictureLinkValidation,
} from './validations';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { MultiSelect } from 'react-multi-select-component';

//data
const defaultData = {
  name: '',
  title: '',
  duration: '',
  description: '',
  genres: [],
  url: '',
  picture: '',
};

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
    if (videoLinkValidation(formData.url) !== null) {
      isValid = false;
    }
    if (pictureLinkValidation(formData.picture) !== null) {
      isValid = false;
    }

    setErrorMessage({
      name: nameValidation(formData.name),
      title: titleValidation(formData.title),
      duration: durationValidation(formData.duration),
      description: descriptionValidation(formData.description),
      url: videoLinkValidation(formData.url),
      picture: pictureLinkValidation(formData.picture),
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm() === true) {
      await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          duration: formData.duration,
          description: formData.description,
          genres: formData.genres,
          url: formData.url,
          picture: formData.picture,
        }),
      });
      props.handleReload();
      setFormData(defaultData);
      handleCloseModal();
    }
  };

  //multiselect
  const [selected, setSelected] = useState([]);

  const handleGenreChange = (selectedGenres) => {
    setSelected(selectedGenres);
    setFormData({
      ...formData,
      genres: selectedGenres.map((genre) => genre.value),
    });
  };

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upravte údaje o videu:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addVideoForm">
            <Input
              title="Interpret:"
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder=""
              validationMessage={nameValidation(formData.name)}
              errorMessage={errorMessage.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrorMessage({ ...errorMessage, name: '' });
              }}
            />
            <Input
              title="Název videa:"
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder=""
              validationMessage={titleValidation(formData.title)}
              errorMessage={errorMessage.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrorMessage({ ...errorMessage, title: '' });
              }}
            />
            <Input
              title="Délka videa:"
              type="number"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Zadejte délku videa"
              validationMessage={durationValidation(formData.duration)}
              errorMessage={errorMessage.duration}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  duration: Number(e.target.value),
                });
                setErrorMessage({ ...errorMessage, duration: '' });
              }}
            />
            {'  '} sekund
            <label>
              Vyber odpovídající žánry:
              <MultiSelect
                options={props.genreData.map((x) => {
                  return {
                    value: x.id,
                    label: x.name,
                  };
                })}
                value={selected}
                onChange={handleGenreChange}
                labelledBy="Vyber"
              />
            </label>
            <Textarea
              title="Popis videa:"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              validationMessage={descriptionValidation(formData.description)}
              errorMessage={errorMessage.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrorMessage({ ...errorMessage, description: '' });
              }}
            />
            <Input
              title="Link na video:"
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder=""
              validationMessage={videoLinkValidation(formData.url)}
              errorMessage={errorMessage.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setErrorMessage({ ...errorMessage, url: '' });
              }}
            />
            <Input
              title="Link na obrázek:"
              validationMessage={pictureLinkValidation(formData.picture)}
              errorMessage={errorMessage.picture}
              onChange={(e) => {
                setFormData({ ...formData, picture: e.target.value });
                setErrorMessage({ ...errorMessage, picture: '' });
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
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
        style={{
          marginLeft: '8px',
          color: 'white',
        }}
        variant="dark"
        size="sm"
        type="submit"
        onClick={handleShowModal}
      >
        <Icon size={0.7} path={mdiPlus} color="white" /> Nové video
      </Button>
    </>
  );
};

export default AddVideoForm;
