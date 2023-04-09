import React, { useState, useMemo } from 'react';
import VideoGridList from './VideoGridList';
import VideoTableList from './VideoTableList';

//styling bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//icons mdi
import Icon from '@mdi/react';
import { mdiTable, mdiViewGridOutline, mdiMagnify } from '@mdi/js';

const VideoList = (props) => {
  const [viewType, setViewType] = useState('grid');
  const isGrid = viewType === 'grid';
  const [searchBy, setSearchBy] = useState('');

  const filteredVideoList = useMemo(() => {
    return props.videoList.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
        item.genre.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, props.videoList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target['searchInput'].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy('');
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam videí</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={'searchInput'}
                style={{ maxWidth: '150px' }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: '8px' }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    if (currentState === 'grid') return 'table';
                    else return 'grid';
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{' '}
                {isGrid ? 'Tabulka' : 'Grid'}
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? (
        <VideoGridList videoList={filteredVideoList} />
      ) : (
        <VideoTableList videoList={filteredVideoList} />
      )}
    </div>
  );
};

export default VideoList;
