import React from 'react';
import Table from 'react-bootstrap/Table';

function VideoTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {props.videoList.map((video) => {
          return (
            <tr key={video.id}>
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
