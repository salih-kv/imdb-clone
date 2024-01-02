import Link from "next/link";
import MenuItem from "./MenuItem";

import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import DarkModeSwitch from "./DarkModeSwitch";

const Header = () => {
  return (
    <div className="flex justify-between mx-2 max-w-screen-xl sm:mx-auto items-center py-6 mb-8">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold bg-amber-500 py-1 px-2 mr-1">IMDb</span>
            <span className="font-medium hidden sm:inline">Clone</span>
          </h2>
        </Link>
      </div>
      <div className="bg-gray-100 dark:bg-gray-600 px-6 py-2 rounded-3xl flex items-center gap-4 w-full max-w-md">
        <ImSearch />
        <input
          type="text"
          className="bg-gray-100 dark:bg-gray-600 outline-none w-full"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center gap-4">
        <MenuItem title="Home" path="/" Icon={AiFillHome} />
        <MenuItem title="About" path="/about" Icon={AiOutlineInfoCircle} />
        <DarkModeSwitch />
      </div>
    </div>
  );
};

export default Header;
