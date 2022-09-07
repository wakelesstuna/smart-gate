import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import Backdrop from "./BackDrop";
import { IoClose } from "react-icons/io5";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal: React.FC<{
  children: ReactElement<any, any>;
  modalOpen: boolean;
  handleClose: () => void;
}> = ({ children, modalOpen, handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="w-[90%] lg:w-[400px] relative"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <IoClose color="black" fontSize={35} />
        </button>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
