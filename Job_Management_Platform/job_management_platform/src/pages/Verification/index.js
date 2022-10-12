import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/libro-transparent-logo.png";
import api from "../../utils/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { deleteUser, getUserEmail } from "../../utils/Common";

export default function Verification() {
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(false);
  const history = useHistory();

  useEffect(() => {
    var token = window.location.href.substring(29);
    //console.log(token.length);
    if (token.length > 0) {
      setVerified(true);
      api.confirmToken(token).then((response) => {
        console.log(response.data);
      });
    }
  }, []);

  function resendVerification() {
    api
      .resendConfirmation(sessionStorage.getItem("userEmail"))
      .then((response) => console.log(response.data));
  }

  function login() {
    history.push("/")
  }

  return (
    <>
      {verified ? (
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Your account has been activated
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-indigo-600">
              You can now start using the Job Management Platform
            </p>
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
              onClick={login}
            >
              <ArrowLeftIcon
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              Log in
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 pt-16">
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Your Company"
              />
            </div>
            <div className="mx-auto max-w-xl py-16 sm:py-24">
              <div className="text-center">
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Check your email.
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                  A verification link will be sent to you within 5 minutes.
                </p>
              </div>
              <div className="mt-12">
                <h2 className="text-base font-semibold text-gray-800">
                  Didn't receive it?
                </h2>
                <div className="mt-8">
                  {!resent ? (
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        resendVerification();
                        setResent(true);
                      }}
                    >
                      Resend
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center px-6 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled
                    >
                      Resent!
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
          {/* <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-12 text-center md:flex md:justify-between">
            <p className="text-base text-gray-400">&copy; Your Company, Inc. All rights reserved.</p>
            <div className="mt-6 flex justify-center space-x-8 md:mt-0">
              {social.map((item, itemIdx) => (
                <a key={itemIdx} href={item.href} className="inline-flex text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </footer> */}
        </div>
      )}
    </>
  );
}
