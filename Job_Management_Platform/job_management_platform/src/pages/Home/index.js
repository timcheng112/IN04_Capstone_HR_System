import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import api from "../../utils/api";
import { deleteUser, getUserId } from "../../utils/Common";
import logo from "../../assets/libro-transparent-logo.png";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Home() {
  const [userId, setUserId] = useState(getUserId());
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
      api.getUser(userId).then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }, [userId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    search();
  };

  function search() {
    //search site
  }

  function logout() {
    deleteUser();
    history.push("/")
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block l:inline text-teal-600">
              Search for a job at
            </span>{" "}
            <img className="mx-auto h-14 w-auto mb-8" src={logo} alt="Libro" />
            {/* <span className="block text-teal-600 xl:inline"></span> */}
          </h1>
          <div className="flex row justify-center">
            <input
              id="job-search"
              name="job-search"
              type="job-search"
              autoComplete="job-search"
              required
              className="block appearance-none w-full rounded-md mr-3 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              placeholder="Position, full-time, skill"
            />
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={handleSubmit}
            >
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {userId ? (
            <></>
          ) : (
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/register"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:py-4 md:px-10 md:text-lg"
                >
                  Create an account
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="/"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                >
                  Log in
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
