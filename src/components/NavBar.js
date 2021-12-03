import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

export function NavBar() {
  const { authenticated, setAuthenticated, setToken, userInfo } =
    useContext(AuthContext);
  const logout = () => {
    setAuthenticated(false);
    setToken(null);
  };

  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link href="/">
              <a className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none font-urban tracking-wider">
                Snippet Hive
              </a>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <a
                href="#_"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Home
              </a>
              <a
                href="#_"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-black"
              >
                Explore
              </a>
              <a
                href="#_"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
              >
                Learn
              </a>
              <Link href="/about">
                <a
                  
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  About
                </a>
              </Link>
            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {authenticated === true ? (
              <a
                className="p-2 rounded hover:text-black hover:bg-gray-300 text-gray-600"
                
              >
                {userInfo.name}
              </a>
            ) : (
              <a></a>
            )}
            {authenticated === false ? (
              <Link href="/login">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-2 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-600"
                >
                  Sign in
                </a>
              </Link>
            ) : (
              <a
                href="#"
                onClick={logout}
                className="inline-flex items-center justify-center px-2 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-500 border border-transparent rounded-md shadow-sm hover:bg-gray-600"
              >
                Log Out
              </a>
            )}{" "}
          </div>
        </div>
      </section>
    </>
  );
}
