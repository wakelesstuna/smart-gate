import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";

const Video: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const play = () => {
    videoRef.current?.play();
  };

  const stop = () => {
    videoRef.current?.pause();
  };

  useEffect(() => {
    videoRef.current?.play();
  }, []);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="container mx-auto flex flex-col items-center p-4">
        <h3 className="text-gray-300 font-semibold text-xl mb-4">
          Gate Camera
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <video
              ref={videoRef}
              src="http://localhost:8001/v1/camera/stream"
              width={500}
              height={500}
              autoPlay={true}
            />
          </div>
          <div>
            <button className="btn-primary mx-4" onClick={play}>
              Play
            </button>
            <button className="btn-primary" onClick={stop}>
              Stop
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Video;

/* 
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
}, []); */
