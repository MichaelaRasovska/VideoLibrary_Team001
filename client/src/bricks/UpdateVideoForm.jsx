import React from 'react';
import '../App.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
  nameValidation,
  titleValidation,
  descriptionValidation,
  durationValidation,
  linkValidation,
  pictureValidation,
} from './validations';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { MultiSelect } from 'react-multi-select-component';

//data
const defaultData = {
  name: '',
  title: '',
  duration: 0,
  description: '',
  genres: [],
  url: '',
  picture: '',
};

const UpdateVideoForm = (props) => {
  const originalData = {
    name: props.video.name,
    title: props.video.title,
    duration: props.video.duration,
    description: props.video.description,
    genres: props.video.genres,
    url: props.video.url,
    picture: props.video.picture,
  };
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
    if (linkValidation(formData.url) !== null) {
      isValid = false;
    }
    if (pictureValidation(formData.picture) !== null) {
      isValid = false;
    }

    setErrorMessage({
      name: nameValidation(formData.name),
      title: titleValidation(formData.title),
      duration: durationValidation(formData.duration),
      description: descriptionValidation(formData.description),
      url: linkValidation(formData.url),
      picture: pictureValidation(formData.picture),
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm() === true) {
      fetch(`http://localhost:8000/videos/${props.video.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name === '' ? originalData.name : formData.name,
          title: formData.title === '' ? originalData.title : formData.title,
          duration:
            formData.duration === 0 ? originalData.duration : formData.duration,
          description:
            formData.description === ''
              ? originalData.description
              : formData.description,
          genres:
            formData.genres === [] ? originalData.genres : formData.genres,
          url: formData.url === '' ? originalData.url : formData.url,
          picture:
            formData.picture === 0 ? originalData.picture : formData.picture,
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
              defaultValue={props.video.name}
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
              defaultValue={props.video.title}
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
              defaultValue={props.video.duration}
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
              Vybrané žánry:{` `}
              {props.video.genres
                .map((genre) => {
                  return genre.name;
                })
                .join(', ')}
            </label>
            <label>
              Vyber nové žánry:
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
              defaultValue={props.video.description}
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
              defaultValue={props.video.url}
              validationMessage={linkValidation(formData.url)}
              errorMessage={errorMessage.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setErrorMessage({ ...errorMessage, url: '' });
              }}
            />
            <Input
              title="Link na obrázek:"
              defaultValue={props.video.picture}
              validationMessage={pictureValidation(formData.picture)}
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
            Uložit
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="outline-secondary" onClick={handleShowModal}>
        Upravit video
      </Button>
    </>
  );
};

export default UpdateVideoForm;
