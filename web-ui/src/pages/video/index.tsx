import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import VideoFeed from "../../components/VideoFeed";

const Video: NextPage = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>();

  const lookupMediaDevices = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((data) => {
        setDevices(data.filter((item) => item.kind === "videoinput"));
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  useEffect(() => {
    lookupMediaDevices();
  }, []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1>Web UI for license recornition</h1>

        <div className="grid grid-cols-2 gap-6">
          {devices &&
            devices.map((device) => (
              <VideoFeed key={device.deviceId} device={device} />
            ))}
        </div>
      </main>
    </>
  );
};

export default Video;
