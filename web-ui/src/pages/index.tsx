import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

interface GateResponse {
  message: string;
  open: boolean;
}

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openGate = async () => {
    const data: GateResponse = await fetch(
      "http://localhost:8000/v1/relay/open"
    ).then((data) => data.json());
    setIsOpen(() => data.open);
  };

  const closeGate = async () => {
    const data: GateResponse = await fetch(
      "http://localhost:8000/v1/relay/close"
    ).then((data) => data.json());
    setIsOpen(() => data.open);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-6xl font-semibold">
          Web UI for license recornition
        </h1>
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
