import { useEffect, useState } from "react";
import { ArrowsPointingInIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import api from "../../utils/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { deleteUser, getUser, getUserEmail } from "../../utils/Common";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const email = getUserEmail()
    //console.log(email);
    setEmail(email);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    confirm();
  };

  function confirm() {
    if (oldPassword !== newPassword) {
      if (newPassword === confirmPassword) {
        //check old password is correct
        console.log(email);
        api.login(email, oldPassword).then((response) => {
          console.log(response.data);
          api
            .resetPassword(email, oldPassword, newPassword)
            .then((response) => alert(response.data))
            .finally(() => {
              deleteUser();
              history.push("/");
            });
        });
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Old password cannot be the same as new password");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset password
            </h2>
            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="old-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Old password
                </label>
                <div className="mt-1">
                  <input
                    id="old-password"
                    name="old-password"
                    type="password"
                    autoComplete="old-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={oldPassword}
                    onChange={(p) => setOldPassword(p.target.value)}
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
                    autoComplete="password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={newPassword}
                    onChange={(p) => setNewPassword(p.target.value)}
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
  );
}
