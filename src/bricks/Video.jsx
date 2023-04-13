import React from 'react';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import { mdiMusic, mdiTuneVariant, mdiAccount } from '@mdi/js';
import VideoDetailsList from './VideoDetailsList';

const Video = (props) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <div key={props.video.id} className="video">
            <div>
              <Icon path={mdiAccount} size={1} color="grey" />{' '}
              {props.video.name}
            </div>
            <div>
              <Icon path={mdiMusic} size={1} color="grey" />
              {props.video.title}
            </div>
            <div>
              <Icon path={mdiTuneVariant} size={1} color="grey" />
              {props.video.genre}
            </div>
            <div>
              <VideoDetailsList key={props.video.id} video={props.video} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Video;
