import { Actions } from "./actions";
import { Logo } from "./logo";
import Search from "./search";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 h-20 px-2 lg:px-4 flex justify-between shadow-sm items-center w-full z-[10] bg-[#252731]">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
