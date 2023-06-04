import React, { useState } from "react";

export const Input = ({
  defaultValue,
  title,
  type,
  value,
  onChange,
  validationMessage,
  errorMessage,
  min,
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
    <label className="form-label">
      {title}

      <input
        className="form-control"
        id="formGroupExampleInput"
        placeholder=""
        type={type}
        value={value}
        min={min}
        defaultValue={defaultValue}
        onChange={onInputChange}
      />
      <span className="form-error">{message}</span>
    </label>
  );
};
