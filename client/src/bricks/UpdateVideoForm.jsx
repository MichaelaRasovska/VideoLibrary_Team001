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
  videoLinkValidation,
  pictureLinkValidation,
} from './validations';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { MultiSelect } from 'react-multi-select-component';

const UpdateVideoForm = (props) => {
  //data
  const defaultData = {
    name: props.video.name,
    title: props.video.title,
    duration: props.video.duration,
    description: props.video.description,
    genres: props.video.genres.map(x => x.id),
    url: props.video.url,
    picture: props.video.picture,
  };

  const emptyData = {
    name: '',
    title: '',
    duration: '',
    description: '',
    genres: [],
    url: '',
    picture: '',
  };

  //modal states
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  //form states
  const [formData, setFormData] = useState(defaultData);
  const [errorMessage, setErrorMessage] = useState(emptyData);
  const [updateVideoCall, setUpdateVideoCall] = useState({
    state: 'inactive'
  });

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
      let response = await fetch(`http://localhost:8000/videos/${props.video.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name === '' ? defaultData.name : formData.name,
          title: formData.title === '' ? defaultData.title : formData.title,
          duration:
            formData.duration === 0 ? defaultData.duration : formData.duration,
          description:
            formData.description === ''
              ? defaultData.description
              : formData.description,
          genres: formData.genres === [] ? defaultData.genres : formData.genres,
          url: formData.url === '' ? defaultData.url : formData.url,
          picture:
            formData.picture === 0 ? defaultData.picture : formData.picture,
        }),
      });

      let data = await response.json();
      if(response.status >= 400){
        setUpdateVideoCall({state: "error", error: data})
      }else{
        setUpdateVideoCall({state: "success", error: data})
        props.handleReload();
        setFormData(defaultData);
        handleCloseModal();
      }
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
              title="Délka videa (v sekundách):"
              type="number"
              min="1"
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
            <label>
              Vybrané žánry:{` `}
              {props.video.genres
                .map((genre) => {
                  return genre.name;
                })
                .join(', ')}
            </label>
            <label>
              Vyberte nové žánry:
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
              validationMessage={videoLinkValidation(formData.url)}
              errorMessage={errorMessage.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                setErrorMessage({ ...errorMessage, url: '' });
              }}
            />
            <Input
              title="Link na obrázek:"
              defaultValue={props.video.picture}
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
          <div>
            {updateVideoCall.state === 'error' &&
                <div className="text-danger">
                  <div>
                    Error: {updateVideoCall.error.message}
                  </div>
                  <div>
                    {updateVideoCall.error.reason &&
                        <p>Reason: {updateVideoCall.error.reason.map(x => `${x.instancePath.substring(1)} ${x.message}`).join('\n')}</p>
                    }
                  </div>
                </div>
            }
          </div>
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
