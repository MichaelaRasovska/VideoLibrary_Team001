import React from 'react';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiMusic, mdiTuneVariant } from '@mdi/js';
import VideoDetailsList from './VideoDetailsList';

const Video = (props) => {
  return (
    <Card>
      <Card.Body>
        <div key={props.video.id} className="video">
          <div>
            <Icon path={mdiMusic} size={1} color="grey" /> {props.video.name}
          </div>
          <div>
            <Icon path={mdiTuneVariant} size={1} color="grey" />
            {props.video.genre}
          </div>
          <div>
            <VideoDetailsList name={props.name} genre={props.genre} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Video;
