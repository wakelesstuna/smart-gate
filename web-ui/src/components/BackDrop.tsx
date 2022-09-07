import { motion } from "framer-motion";

const Backdrop: React.FC<{
  children: JSX.Element | JSX.Element[];
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center overflow-y-hidden"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
