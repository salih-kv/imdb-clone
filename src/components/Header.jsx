import Link from "next/link";
import MenuItem from "./MenuItem";

import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import DarkModeSwitch from "./DarkModeSwitch";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-p-dark items-center py-6 mb-8">
      <div className="flex justify-between gap-4 md:gap-12 max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <h2 className="text-sm lg:text-2xl overflow-hidden py-1">
              <span className="font-bold bg-amber-500 py-2 px-2">IMDb</span>
              <span className="font-medium hidden sm:inline px-2">Clone</span>
            </h2>
          </Link>
        </div>
        <SearchBox />
        <div className="flex items-center gap-4 md:gap-8">
          <MenuItem title="Home" path="/" Icon={AiFillHome} />
          <MenuItem title="About" path="/about" Icon={AiOutlineInfoCircle} />
          <DarkModeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
