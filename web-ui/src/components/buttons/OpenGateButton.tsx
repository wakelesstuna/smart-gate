import axios, { AxiosStatic } from "axios";
import React, { Dispatch, SetStateAction } from "react";

const getBaseUrl = () => {
  const raspberrypi = false;
  if (raspberrypi) return "http://192.168.1.176:8001";
  return "http://localhost:8001";
};

const baseUrl = getBaseUrl();

interface GateResponse {
  message: string;
  open: boolean;
}

const OpenGateButton: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  const openGate = async () => {
    const response = await axios.get(`${baseUrl}/v1/gate/open`);
    const data: GateResponse = response.data;
    setIsOpen(() => data.open);
  };
  return (
    <button className="btn btn-blue" onClick={openGate}>
      Open Gate
    </button>
  );
};

export default OpenGateButton;
