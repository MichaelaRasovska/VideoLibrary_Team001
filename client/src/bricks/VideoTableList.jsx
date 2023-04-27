import React from 'react';
import Table from 'react-bootstrap/Table';

function VideoTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Interpret</th>
          <th>Název</th>
          <th>Délka trvání</th>
          <th>Žánry</th>
        </tr>
      </thead>
      <tbody>
        {props.videoList.map((video) => {
          return (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.name}</td>
              <td>{video.title}</td>
              <td>{video.duration}</td>
              <td>
                {video.genres.map((genre) => {
                  return genre.label + ', ';
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default VideoTableList;
