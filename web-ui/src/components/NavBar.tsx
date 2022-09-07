import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink, navLinks } from "../data/nav-links";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="relative h-16 w-full bg-gray-900">
      <div className="mx-auto flex h-full items-center justify-between px-5">
        <h1>SMART GATE</h1>
        <button onClick={() => setIsOpen((state) => !state)}>
          {isOpen ? (
            <IoClose className="cursor-pointer" fontSize={45} />
          ) : (
            <HiOutlineMenu className="cursor-pointer" fontSize={45} />
          )}
        </button>
      </div>
      <AnimatePresence>{isOpen && <MobileMenu />}</AnimatePresence>
    </nav>
  );
};

export default NavBar;

const menuVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.0, staggerDirection: -1 },
  },
};

const MobileMenu: React.FC = () => {
  const height = 65 * (navLinks.length + 1);
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="absolute top-16 z-50 h-fit w-screen bg-gray-900"
    >
      <motion.ul variants={menuVariants}>
        {navLinks.map((link) => (
          <MenuItemMobile link={link} key={link.id} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
  },
};

const MenuItemMobile: React.FC<{ link: NavLink }> = ({ link }) => {
  return (
    <motion.li
      className="flex h-[65px] justify-center border-b-[0.5px] py-4"
      variants={menuItemVariants}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={link.link} className="flex items-center ">
        <a className="text-2xl font-semibold text-white">{link.name}</a>
      </Link>
    </motion.li>
  );
};
