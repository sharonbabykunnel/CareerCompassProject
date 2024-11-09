import React from 'react';

const VideoPlayer = ({ src, type, controls = true, autoplay = true, loop = false, muted = true }) => {
  return (
    <div>
      <video
        src={src}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        style={{ width: '100%', height: 'auto' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
