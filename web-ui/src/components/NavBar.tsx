import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="flex pt-10">
      <div className="flex-1 ml-20 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">smart gate</h1>
      </div>
      <div className="relative flex items-center justify-center focus:outline-none w-20">
        <label onClick={() => setIsOpen((state) => !state)}>
          <HiOutlineMenu className="cursor-pointer" fontSize={45} />
        </label>
        {isOpen && (
          <ul
            tabIndex={0}
            className="absolute z-50 top-12 right-4 w-[200px] rounded-md p-2 shadow bg-white"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
