import React from 'react';
import styled from 'styled-components';

const VideoBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
  cursor: none;
  z-index: -1;
`;

const VideoContent = styled.div`
  width: 80rem;
  margin: auto;
  height: 100%;
`;

const Video = styled.video`
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
`;

const VideoWrapper = styled.div`
  width: 576.481px;
  margin-left: auto;
  transform: translateY(-50%);
  top: 52%;
  right: -17.8125rem;
  will-change: transform;
  position: relative;
`;

const VideoBackground = () => (
  <VideoBg>
    <VideoContent>
      <VideoWrapper>
        <Video autoPlay loop preload="auto" playsInline="playsinline" muted="muted" tabIndex="-1">
          <source src="https://hoang.moe/wp-content/themes/degamin/dist/public/video/06_WritingLoop.h264.m4v" type="video/mp4" />
        </Video>
      </VideoWrapper>
    </VideoContent>
  </VideoBg>
);

export default VideoBackground;
