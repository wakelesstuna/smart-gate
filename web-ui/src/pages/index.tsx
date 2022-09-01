import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const getOS = () => {
  const os = ["Windows", "Linux", "Mac"]; // add your OS values
  return os.find((v) => navigator.appVersion.indexOf(v) >= 0);
};

const getBaseUrl = () => {
  const raspberrypi = getOS();
  if (raspberrypi !== "Windows") return "http://192.168.1.176:8001";
  return "http://localhost:8000";
};

const baseUrl = getBaseUrl();

interface GateResponse {
  message: string;
  open: boolean;
}

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openGate = async () => {
    const response: Response = await fetch(`${baseUrl}/v1/relay/open`);
    const data: GateResponse = await response.json();
    console.log("open: ", data);
    setIsOpen(() => data.open);
  };

  const closeGate = async () => {
    const response: Response = await fetch(`${baseUrl}/v1/relay/close`);
    const data: GateResponse = await response.json();
    console.log("close: ", data);
    setIsOpen(() => data.open);
  };

  return (
    <>
      <Head>
        <title>Smart Gate UI</title>
        <meta name="description" content="web ui for smart gate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-6xl font-semibold">Web UI for SMART GATE</h1>
        <div className="flex flex-col">
          <div className="flex-1 text-center">
            <p>Gate is: {isOpen ? "OPEN" : "CLOSE"}</p>
          </div>
          <div className="space-x-8">
            <button className="btn btn-blue" onClick={openGate}>
              Open Gate
            </button>
            <button className="btn btn-red" onClick={closeGate}>
              Close Gate
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
