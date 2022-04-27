import Link from "next/link";
import styles from "../styles/menu.module.css";
const Navbar = () => (
  <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <a className="flex items-center">
        <span className="self-center text-xl text-purple-700 font-semibold whitespace-nowrap dark:text-white">LilFluttershy Store</span>
    </a>

    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
           <Link href="/profile">
              <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white" aria-current="page"> Home </a>
           </Link>
        </li>
        <li>
           <Link href="/detail">
              <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white" aria-current="page"> About Products </a>
           </Link>
        </li>
        <li>
           <Link href="/shops">
              <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white" aria-current="page"> Products </a>
           </Link>
        </li>
        <li>
           <Link href="/admin">
              <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white" aria-current="page"> Add Products </a>
           </Link>
        </li>
        <li>
           <Link href="/">
              <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white" aria-current="page"> Logout </a>
           </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
);

export default Navbar;
