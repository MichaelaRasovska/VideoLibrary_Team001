import React, {useContext} from 'react';
import Card from 'react-bootstrap/Card';
import VideoDetailsList from './VideoDetailsList';
import ListGroup from 'react-bootstrap/ListGroup';
import UserContext from "../UserProvider";

const Video = (props) => {
  const {canViewDetail} = useContext(UserContext);
  return (
    <div className="hover_card">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.video.picture} />
        <Card.Body className="card-body">
          <Card.Title>
            {props.video.title} from {props.video.name}
          </Card.Title>
          <Card.Text className="list-group-flush">
            {props.video.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Žánr: {props.video.genres.map((genre) => genre.name).join(', ')}
          </ListGroup.Item>
        { canViewDetail() &&
          <ListGroup.Item>
            <VideoDetailsList
                key={props.video.id}
                handleReload={props.handleReload}
                video={props.video}
                genreData={props.genreData}
            />
          </ListGroup.Item>
        }
        </ListGroup>
      </Card>
    </div>
  );
};

export default Video;
