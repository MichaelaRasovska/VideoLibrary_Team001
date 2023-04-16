import React from 'react';
import Table from 'react-bootstrap/Table';

function VideoTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Interpret</th>
          <th>Žánr</th>
        </tr>
      </thead>
      <tbody>
        {props.videoList.map((video) => {
          return (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.name}</td>
              <td>{video.genre}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default VideoTableList;
