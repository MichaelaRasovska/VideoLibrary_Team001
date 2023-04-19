import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const options = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Elektro', value: 'elektro' },
  { label: 'Metal', value: 'metal' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Hip Hop', value: 'hip-hop' },
  { label: 'Folk', value: 'folk' },
  { label: 'Opera', value: 'opera' },
  { label: 'Jiné', value: 'other' },
];

export let selectedGenres = [];

const Multiselect = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Vyber"
      />
    </div>
  );
};

export default Multiselect;
