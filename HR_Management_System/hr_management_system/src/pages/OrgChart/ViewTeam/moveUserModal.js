import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../../utils/api";

export default function MoveUserModal({
  open,
  onClose,
  user,
  params = [],
  ...props
}) {
  //the dept name is passed from prev page?
  const [newTeam, setNewTeam] = useState(-1);
  const [options, setOptions] = useState(null);

  //MIGHT HAVE ERRORS.
  //we should do 2 methods, 1 to remove, 1 to add. the add method will be called if we detect another team being selected.
  // function removeFromTeam() {}

  // function addToTeam() {}
  // console.log(props)
  // console.log(params)

  useEffect(() => {
    const otherTeams = async () => {
      const arr = [];
      await api.getAllTeams().then((res) => {
        let result = res.data;
        result.map((team) => {
          // console.log(...params)
          // console.log(props.teamId + "please")
          if (team.teamId !== props.teamId) {
            return arr.push({
              value: team.teamId,
              label: team.teamName,
            });
          }
        });
        setOptions(arr);
        // console.log("fetching options...");
        // console.log(options);
      });
    };
    otherTeams();
  }, [newTeam]);
  // console.log(newTeam)
  function moveEmpToTeam() {
    // console.log(newTeam)
    // console.log(typeof(newTeam))
    // console.log(props.empInQuestion)
    api
      .moveEmpToTeam(
        parseInt(props.empInQuestion),
        parseInt(props.teamId),
        parseInt(newTeam)
      )
      .then((response) => {
        console.log(response.data);
        // props.setOpenMove(false);
        props.empInQuestion = "";
        alert("Successfully moved employee.");
        window.location.reload();
        props.setOpen(false);
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //removeFromTeam()
    //some logic to check
    //addToTeam()
    moveEmpToTeam();
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="mt-10 sm:mt-0">
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form
                      className="space-y-8 divide-y divide-gray-200"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                              Move an employee to another team
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Please select another manager to be the new
                              Organisation Head.
                            </p>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Choose Team to Move Employee to...
                              </label>
                              <div className="mt-2 sm:col-span-2 ">
                                <select
                                  onChange={(e) => setNewTeam(e.target.value)}
                                  // placeholder="Select a Manager (might take a while...)"
                                  id="orgHead"
                                  name="orgHead"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                  <option>Select a team...</option>
                                  {/*<option>1</option>*/}
                                  {options !== null &&
                                    options.map((option, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                          {/* {console.log(props.empInQuestion + "?") } */}
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            // onClick={() => {
                            //   props.onConfirm(...params);
                            //   props.setOpen(false)
                            //   console.log(...params);
                            // }}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
