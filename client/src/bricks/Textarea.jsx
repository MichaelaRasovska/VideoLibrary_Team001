import React, { useState } from "react";

export const Textarea = ({
  defaultValue,
  title,
  type,
  value,
  onChange,
  validationMessage,
  errorMessage,
}) => {
  const [fieldChanged, setFieldChanged] = useState(false);

  const onInputChange = (e) => {
    setFieldChanged(true);
    onChange(e);
  };

  let message = "";

  if (errorMessage !== "") {
    message = errorMessage;
  } else if (fieldChanged === true) {
    message = validationMessage;
  }

  return (
    <label className="form-label" htmlFor="exampleFormControlTextarea1">
      {title}
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onInputChange}
        // rows="6"
        cols="90"
      ></textarea>
      <span className="form-error">{message}</span>
    </label>
  );
};
