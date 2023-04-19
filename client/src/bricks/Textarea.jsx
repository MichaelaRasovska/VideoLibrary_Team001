import React, { useState } from 'react';

export const Textarea = ({
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

  let message = '';

  if (errorMessage !== '') {
    message = errorMessage;
  } else if (fieldChanged === true) {
    message = validationMessage;
  }

  return (
    <label className="form-label">
      {title}
      <textarea
        className="form-textarea"
        type={type}
        value={value}
        onChange={onInputChange}
        rows="6"
        cols="30"
      ></textarea>
      <span className="form-error">{message}</span>
    </label>
  );
};
