import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import AddNumberPlateForm from "../../components/forms/AddNumberPlateForm";
import {
  deleteNumberPlate,
  NumberPlate,
  useNumberPlates,
} from "../../hooks/useNumberPlates";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";

const getBaseUrl = () => {
  const raspberrypi = false;
  if (raspberrypi) return "http://192.168.1.176:8001";
  return "http://localhost:8000";
};

const baseUrl = getBaseUrl();

const Home: NextPage = () => {
  const { modalOpen, open, close } = useModal();
  return (
    <>
      <Head>
        <title>Smart Gate UI</title>
        <meta name="description" content="web ui for smart gate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="container mx-auto flex flex-col items-center p-4">
        <h3 className="font-bold text-2xl text-gray-300 mb-4">
          Current number plates
        </h3>
        <NumberPlateList />
      </main>

      <motion.button
        onClick={open}
        className="fixed right-5 bottom-10 btn-primary"
      >
        Add Number Plate
      </motion.button>
      <ModalContainer>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <div className="px-4 py-2 bg-gray-200 rounded-sm">
              <h1 className="font-semibold text-2xl">Add Number Plate</h1>
              <AddNumberPlateForm handleClose={close} />
            </div>
          </Modal>
        )}
      </ModalContainer>
    </>
  );
};

const NumberPlateList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: numberPlates, isLoading, er: error } = useNumberPlates();

  if (isLoading) return <p className="text-white">Loading number plates...</p>;
  if (error)
    return (
      <>
        <p>{error.statusCode}</p>
        <p>{error.response.detail}</p>
      </>
    );
  return (
    <>
      <motion.ul layout className="space-y-4">
        {numberPlates &&
          numberPlates.map((plate) => (
            <NumberPlateCard key={plate.id} plate={plate} />
          ))}
      </motion.ul>
    </>
  );
};

const NumberPlateCard: React.FC<{
  plate: NumberPlate;
}> = ({ plate }) => {
  const deleteNumberPlateMutation = deleteNumberPlate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li
      layout
      onClick={toggleOpen}
      className="rounded-r-sm bg-gray-500 border-l-4 border-green-500 px-4 py-2 w-[250px] shadow-md"
    >
      <motion.div layout className="flex">
        <motion.div layout className="flex-1">
          <motion.p layout className="tracking-wider font-semibold">
            {plate.numberPlate}
          </motion.p>
        </motion.div>
        <motion.div
          layout
          className="flex items-center justify-center space-x-2"
        >
          <motion.span layout>{plate.users.length}</motion.span> <FaUser />
          <span onClick={() => deleteNumberPlateMutation.mutate(plate.id!)}>
            <FaRegTrashAlt color="black" fontSize={20} />
          </span>
        </motion.div>
      </motion.div>
      <AnimatePresence>{isOpen && <Content plate={plate} />}</AnimatePresence>
    </motion.li>
  );
};

const Content: React.FC<{ plate: NumberPlate }> = ({ plate }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {plate.users &&
        plate.users.map((user) => (
          <motion.p layout key={user.name}>
            {user.name}
          </motion.p>
        ))}
    </motion.div>
  );
};

const ModalContainer: React.FC<{
  children: JSX.Element | JSX.Element[] | false;
}> = ({ children }) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={false}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    mode="wait"
    // Fires when all exiting nodes have completed animating out
    onExitComplete={() => console.log("exiting")}
  >
    {children}
  </AnimatePresence>
);

export default Home;
