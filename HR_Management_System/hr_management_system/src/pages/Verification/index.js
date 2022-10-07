import { useEffect, useState } from "react";
import logo from "../../assets/libro-transparent-logo.png";
import api from "../../utils/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { deleteUser, getUserEmail } from "../../utils/Common";
import { useHistory } from "react-router-dom";

export default function Verification() {
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    var urlToken = window.location.href.substring(29);
    console.log("url token = " + urlToken);
    setToken(urlToken);
    if (urlToken.length > 0) {
      api
        .confirmToken(urlToken)
        .then((response) => {
          api
            .getEmployeeByToken(urlToken)
            .then((response) => setEmail(response.data));
        })
        .catch((error) => {
          var message = error.request.response;
          if (message.includes("Email is already verified")) {
            alert("Email is already verified");
          } else if (message.includes("Email has already been confirmed")) {
            alert("Email has already confirmed");
          } else if (message.includes("Token has already expired")) {
            alert("Token has already expired");
          }
        });
    }
  }, [token]);

  function resendVerification() {
    var email = sessionStorage.getItem("userEmail");
    console.log("resend verification to = " + email);
    api
      .resendConfirmation(email)
      .then((response) => console.log(response.data));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password === confirmPassword) {
      verifyTempPassword();
    } else {
      alert("Passwords do not match!");
    }
  };

  function verifyTempPassword() {
    api
      .getEmployeeByToken(token)
      .then((response) => setEmail(response.data))
      .then(() => {
        api
          .verifyTempPassword(email, tempPassword)
          .then((response) => {
            alert(response.data);
            setFirstPassword();
          })
          .catch((error) => {
            const message = error.request.response;
            if (message.includes("Invalid temporary password")) {
              alert("Invalid temporary password");
            }
          });
      });
  }

  function setFirstPassword() {
    console.log("work email = " + email)
    api
      .setFirstPassword(email, password)
      .then((response) => alert(response.data))
      .then(() => history.push("/"));
  }

  return (
    <>
      {token ? (
        <>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Verify your account
                  </h2>
                  <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="temp-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Temporary password
                      </label>
                      <div className="mt-1">
                        <input
                          id="temp-password"
                          name="temp-password"
                          type="password"
                          autoComplete="temp-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={tempPassword}
                          onChange={(p) => setTempPassword(p.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={password}
                          onChange={(p) => setPassword(p.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          autoComplete="confirm-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          value={confirmPassword}
                          onChange={(p) => setConfirmPassword(p.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        //   <div className="text-center">
        //     <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        //       Your account has been activated
        //     </p>
        //     <p className="mx-auto mt-5 max-w-xl text-xl text-indigo-600">
        //       You can now start using HRMS after logging in
        //     </p>
        //       <button
        //         type="button"
        //         className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        //         onClick={login}
        //       >
        //         <ArrowLeftIcon
        //           className="-ml-1 mr-3 h-5 w-5"
        //           aria-hidden="true"
        //         />
        //         Log in
        //       </button>
        //   </div>
        // </div>
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
                  A verification email should have been sent to you.
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
