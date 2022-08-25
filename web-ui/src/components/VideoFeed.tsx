import React, { useEffect, useRef } from "react";

const width = 500;
const height = 500;

const VideoFeed: React.FC<{ device: MediaDeviceInfo }> = ({ device }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: device.deviceId,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.log(err));
    };
    startVideo();
  }, [device.deviceId]);

  return (
    <div className="border border-black">
      <video
        ref={videoRef}
        height={height}
        width={width}
        muted
        autoPlay
      ></video>
    </div>
  );
};

export default VideoFeed;
