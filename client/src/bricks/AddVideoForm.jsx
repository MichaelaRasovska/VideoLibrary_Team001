import React from "react";
import "../App.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import {
  nameValidation,
  titleValidation,
  descriptionValidation,
  durationValidation,
  linkValidation,
  pictureValidation,
} from "./validations";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { MultiSelect } from "react-multi-select-component";

//data
const defaultData = {
  name: "",
  title: "",
  duration: 0,
  description: "",
  genres: [],
  url: "",
  picture: "",
};

//Multiselect

const genres = [
  { label: "Pop", value: "pop", name: "Pop" },
  { label: "Rock", value: "rock", name: "Rock" },
  { label: "Hip hop", value: "hip-hop", name: "Hip hop" },
  { label: "Dance music", value: "dance-music", name: "Dance music" },
];

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
      console.log(formData);
      fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          <Modal.Title>Vyplňte údaje o videu:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addVideoForm">
            <label for="formGroupExampleInput">
              Interpret:
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder=""
                validationMessage={nameValidation(formData.name)}
                errorMessage={errorMessage.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrorMessage({ ...errorMessage, name: "" });
                }}
              />
            </label>

            <label for="formGroupExampleInput">
              Název videa:
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder=""
                validationMessage={titleValidation(formData.title)}
                errorMessage={errorMessage.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  setErrorMessage({ ...errorMessage, title: "" });
                }}
              />
            </label>

            <label for="formGroupExampleInput">
              Délka videa: (min)
              <div class="input-with-addon">
                <input
                  type="number"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Zadejte délku videa v minutách"
                  validationMessage={durationValidation(formData.duration)}
                  errorMessage={errorMessage.duration}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      duration: Number(e.target.value),
                    });
                    setErrorMessage({ ...errorMessage, duration: "" });
                  }}
                />
              </div>
            </label>
            <label>
              Vyber odpovídající žánry:
              <div>
                <pre>{JSON.stringify(selected)}</pre>
                <MultiSelect
                  options={genres}
                  value={selected}
                  onChange={handleGenreChange}
                  labelledBy="Vyber"
                />
              </div>
            </label>

            <label for="exampleFormControlTextarea1">
              Popis:
              <Textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                validationMessage={descriptionValidation(formData.description)}
                errorMessage={errorMessage.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  setErrorMessage({ ...errorMessage, description: "" });
                }}
              />
            </label>
            <label>
              Link na video:
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                placeholder=""
                validationMessage={linkValidation(formData.url)}
                errorMessage={errorMessage.url}
                onChange={(e) => {
                  setFormData({ ...formData, url: e.target.value });
                  setErrorMessage({ ...errorMessage, url: "" });
                }}
              />
            </label>

            <label>
              Link na obrázek:
              <Input
                validationMessage={pictureValidation(formData.picture)}
                errorMessage={errorMessage.picture}
                onChange={(e) => {
                  setFormData({ ...formData, picture: e.target.value });
                  setErrorMessage({ ...errorMessage, picture: "" });
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
        style={{
          marginLeft: "8px",
          color: "white",
        }}
        variant="primary"
        size="lg"
        type="submit"
        onClick={handleShowModal}
      >
        <Icon size={1} path={mdiPlus} color="white" /> Nové video
      </Button>
    </>
  );
};

export default AddVideoForm;
