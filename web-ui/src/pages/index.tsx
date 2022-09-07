import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import CloseGateButton from "../components/buttons/CloseGateButton";
import OpenGateButton from "../components/buttons/OpenGateButton";
import NavBar from "../components/NavBar";

const getBaseUrl = () => {
  const raspberrypi = false;
  if (raspberrypi) return "http://192.168.1.176:8001";
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

      <NavBar />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl text-white text-center font-semibold">
          Web UI for SMART GATE
        </h1>
        <div className="flex flex-col">
          <div className="flex-1 text-center my-4">
            <p className="text-white">
              Gate is:{" "}
              <span
                className={
                  `px-2 py-[1px] rounded-md font-semibold ` +
                  (isOpen ? "bg-green-500" : "bg-red-500")
                }
              >
                {isOpen ? "OPEN" : "CLOSE"}
              </span>
            </p>
          </div>
          <div className="space-x-8">
            <OpenGateButton setIsOpen={setIsOpen} />
            <CloseGateButton setIsOpen={setIsOpen} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
