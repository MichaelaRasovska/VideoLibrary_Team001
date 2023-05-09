import React from "react";
import Card from "react-bootstrap/Card";
import VideoDetailsList from "./VideoDetailsList";
import ListGroup from "react-bootstrap/ListGroup";

const Video = (props) => {
  return (
    <div className="hover_card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.video.picture} />
        <Card.Body className="card-body">
          <Card.Title>
            {props.video.title} from {props.video.name}
          </Card.Title>
          <Card.Text className="list-group-flush">
            {props.video.description}
          </Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Žánr:{" "}
              {props.video.genres.map((genre) => {
                return genre.name + ", ";
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              <VideoDetailsList key={props.video.id} video={props.video} />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Video;
