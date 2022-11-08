import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { Switch } from "@headlessui/react";
import ReactSlider from "react-slider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddAppraisalModal({
  open,
  onClose,
  deptId,
  refreshKeyHandler,
}) {
  const userId = getUserId();

  //   const [deptHeadId, setDeptHeadId] = useState(-1);

  const [outlet, setOutletId] = useState("");
  const [promotion, setPromotion] = useState(false);
  const [strength, setStrength] =useState("");
  const [weakness, setWeakness] = useState("");
  const [reason, setReason] = useState("");
  const [rating, setRating] = useState(-1);
  const [appraised, setAppraised] = useState(-1);
  const cancelButtonRef = useRef(null);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5);


//   StyleSheet

//   function addTeam() {
//     if (teamHeadId === -1) {
//       alert("Please select a Manager!");
//     } else {
//       console.log("addTeamfunc :" + teamName + " " + teamHeadId + " ");
//       api
//         .addTeam(teamName, parseInt(teamHeadId), outlet, promotion, deptId)
//         .then((response) => {
//           if (response.status === 200) {
//             console.log("successfully added new team!");
//             alert("Team has been successfully created.");
//             refreshKeyHandler();
//           } else {
//             console.error("failed to add new team!");
//             alert("Failed to create team.");
//           }
//         })
//         .catch((error) => {
//           var message = error.request.response;
//           console.log(message);
//           if (message.includes("User selected is not a Manager")) {
//             alert(
//               "The user you selected was not a manager! Please select a manager to be the department head."
//             );
//           } else if (
//             message.includes("Manager selected is not an active employee")
//           ) {
//             alert(
//               "The selected employee is not enabled! Please select another manager or seek administrative help to enable the manager's account."
//             );
//           }
//         });
//     }
//   }
  const [options, setOptions] = useState(null);
  useEffect(() => {
    const availStaff = async () => {
      const arr = [];
      await api.getAllStaff().then((res) => {
        let result = res.data;
        result.map((person) => {
          return arr.push({
            value: person.userId,
            label: person.firstName + " " + person.lastName,
          });
        });
        setOptions(arr);
        // console.log("fetching options...");
        // console.log(options);
        // console.log("HELLO!");
        // console.log(res);
        // console.log(res.data);
        // console.log(typeof res.data.items);
      });
    };
    availStaff();
  }, [userId]);

//   const [outletOptions, setOutletOptions] = useState(null);



  const handleSubmit = (evt) => {
    evt.preventDefault();
    //method for add
    onClose();
  };

  return (
    <Transition.Root show={true} as={Fragment}>
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
                              Create a new Appraisal
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Create a new appraisal by providing strengths and weaknesses for this member of the team.
                            </p>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                              <label
                                htmlFor="dept-name"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Appraisal for
                              </label>
                              <div className="mt-2 sm:col-span-2">
                                {/* <input
                                  //   onChange={(e) => setTeamName(e.target.value)}
                                  type="text"
                                  name="appraisal-name"
                                  id="appraisal-name"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                />
                                <div className="mt-2 sm:col-span-2 "> */}
                                <select
                                  onChange={(e) =>
                                   
                                    setAppraised(e.target.value)
                                  }
                             
                                  id="teamHead"
                                  name="teamHead"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                  <option>
                                    Select A User ...
                                  </option>
                               
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
                              {/* </div> */}
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                              <label
                                htmlFor="dept-name"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Strength
                              </label>
                              <div className="mt-2 sm:col-span-2">
                                {/* <input
                                  //   
                                  type="text"
                                  name="strength"
                                  id="strength"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                /> */}
                                <textarea
                                    onChange={(e) => setStrength(e.target.value)}
                                    name="strength"
                                    id="strength"
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                
                                />
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                              <label
                                htmlFor="dept-name"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Weakness
                              </label>
                              <div className="mt-2 sm:col-span-2">
                                {/* <input
                             
                                  type="text"
                                  name="weakness"
                                  id="weakness"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                /> */}
                                <textarea
                                    onChange={(e) => setWeakness(e.target.value)}
                                    name="strength"
                                    id="strength"
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                
                                />
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="dept-name"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Rating
                              </label>
                              <div className="mt-2 sm:col-span-2">
                                {/* <ReactSlider 
                                min={0}
                                max={5}
                                defaultValue={[min, max]}
                                className="slider"
                                trackClassName="tracker"
                                
                                pearling={true}
                                /> */}

                                <ReactSlider
                                  defaultValue={[min, max]}
                                  className="slider"
                                  trackClassName="tracker"
                                  min={0}
                                  max={500}
                                  minDistance={50}
                                  step={50}
                                  withTracks={true}
                                  pearling={true}
                                  renderThumb={(props) => {
                                    return (
                                      <div {...props} className="thumb"></div>
                                    );
                                  }}
                                  renderTrack={(props) => {
                                    return (
                                      <div {...props} className="track"></div>
                                    );
                                  }}
                                  onChange={([min, max]) => {
                                    setMin(min);
                                    setMax(max);
                                  }}
                                />

                                <div className="values-wrapper">
                                  <p>
                                    Min Value:
                                    <span>{min}</span>
                                  </p>
                                  <p>
                                    Max Value:
                                    <span>{max}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="teamhead"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                Team Head
                              </label>
                              <div className="mt-2 sm:col-span-2 ">
                                <select
                                  onChange={(e) =>
                                    setTeamHeadId(e.target.value)
                                  }
                             
                                  id="teamHead"
                                  name="teamHead"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                  <option>
                                    Select A Team Head (Manager)...
                                  </option>
                               
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
                            </div> */}

                            

                            {/* Promotion */}
                            <div>
                              <Switch.Group
                                as="div"
                                className="flex items-center justify-between mt-10"
                              >
                                <span className="flex flex-grow flex-col">
                                  <Switch.Label
                                    as="span"
                                    className="text-sm font-medium text-gray-900"
                                    passive
                                  >
                                    Up for promotion
                                  </Switch.Label>
                                </span>
                                <Switch
                                  checked={promotion}
                                  onChange={setPromotion}
                                  className={classNames(
                                    promotion ? "bg-indigo-600" : "bg-gray-200",
                                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      promotion
                                        ? "translate-x-5"
                                        : "translate-x-0",
                                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out"
                                    )}
                                  />
                                </Switch>
                              </Switch.Group>
                            </div>
                          </div>
                        </div>
                      </div>

                      {promotion ? 
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                              <label
                                htmlFor="dept-name"
                                className="block text-sm font-medium text-gray-700 sm:pt-2"
                              >
                                State promotion reason and potential roles
                              </label>
                              <div className="mt-2 sm:col-span-2">
                                {/* <input
                             
                                  type="text"
                                  name="weakness"
                                  id="weakness"
                                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                /> */}
                                <textarea
                                    onChange={(e) => setReason(e.target.value)}
                                    name="reason"
                                    id="reason"
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                
                                />
                              </div>
                            </div> : ""}



                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Create
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
