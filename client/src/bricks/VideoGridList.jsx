import React from 'react';
import Video from './Video';

const VideoGridList = (props) => {
  return props.videoData.map((video) => {
    return (
      <Video
        key={video.id}
        video={video}
        genreData={props.genreData}
        />
    );
  });
};

export default VideoGridList;
