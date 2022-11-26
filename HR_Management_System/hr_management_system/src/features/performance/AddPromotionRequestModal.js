// import { Fragment, useEffect, useRef, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import api from "../../utils/api";
// import { getUserId } from "../../utils/Common";
import { Switch } from "@headlessui/react";
// import ReactSlider from "react-slider";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function AddPromotionRequestModal({
//   open,
//   onClose,

// }) {
//   const userId = getUserId();

//   //   const [deptHeadId, setDeptHeadId] = useState(-1);

//   const [outlet, setOutletId] = useState("");
//   const [promotion, setPromotion] = useState(false);
//   const [strength, setStrength] =useState("");
//   const [weakness, setWeakness] = useState("");
//   const [reason, setReason] = useState("");
//   const [rating, setRating] = useState(-1);
//   const [appraised, setAppraised] = useState(-1);
//   const cancelButtonRef = useRef(null);

//   const [min, setMin] = useState(0);
//   const [max, setMax] = useState(5);

// //   StyleSheet

// //   function addTeam() {
// //     if (teamHeadId === -1) {
// //       alert("Please select a Manager!");
// //     } else {
// //       console.log("addTeamfunc :" + teamName + " " + teamHeadId + " ");
// //       api
// //         .addTeam(teamName, parseInt(teamHeadId), outlet, promotion, deptId)
// //         .then((response) => {
// //           if (response.status === 200) {
// //             console.log("successfully added new team!");
// //             alert("Team has been successfully created.");
// //             refreshKeyHandler();
// //           } else {
// //             console.error("failed to add new team!");
// //             alert("Failed to create team.");
// //           }
// //         })
// //         .catch((error) => {
// //           var message = error.request.response;
// //           console.log(message);
// //           if (message.includes("User selected is not a Manager")) {
// //             alert(
// //               "The user you selected was not a manager! Please select a manager to be the department head."
// //             );
// //           } else if (
// //             message.includes("Manager selected is not an active employee")
// //           ) {
// //             alert(
// //               "The selected employee is not enabled! Please select another manager or seek administrative help to enable the manager's account."
// //             );
// //           }
// //         });
// //     }
// //   }
//   const [options, setOptions] = useState(null);
//   useEffect(() => {
//     const availStaff = async () => {
//       const arr = [];
//       await api.getAllStaff().then((res) => {
//         let result = res.data;
//         result.map((person) => {
//           return arr.push({
//             value: person.userId,
//             label: person.firstName + " " + person.lastName,
//           });
//         });
//         setOptions(arr);
//         // console.log("fetching options...");
//         // console.log(options);
//         // console.log("HELLO!");
//         // console.log(res);
//         // console.log(res.data);
//         // console.log(typeof res.data.items);
//       });
//     };
//     availStaff();
//   }, [userId]);

// //   const [outletOptions, setOutletOptions] = useState(null);

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     //method for add
//     onClose();
//   };

//   return (
//     <Transition.Root show={true} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-10"
//         initialFocus={cancelButtonRef}
//         onClose={onClose}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                 <div className="mt-10 sm:mt-0">
//                   <div className="mt-5 md:col-span-2 md:mt-0">
//                     <form
//                       className="space-y-8 divide-y divide-gray-200"
//                       onSubmit={handleSubmit}
//                     >
//                       <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
//                         <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
//                           <div>
//                             <h3 className="text-lg font-medium leading-6 text-gray-900">
//                               Create a new Appraisal
//                             </h3>
//                             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                               Create a new appraisal by providing strengths and weaknesses for this member of the team.
//                             </p>
//                           </div>
//                           <div className="space-y-6 sm:space-y-5">
//                             <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
//                               <label
//                                 htmlFor="dept-name"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 Promotion request for
//                               </label>
//                               <div className="mt-2 sm:col-span-2">
//                                 {/* <input
//                                   //   onChange={(e) => setTeamName(e.target.value)}
//                                   type="text"
//                                   name="appraisal-name"
//                                   id="appraisal-name"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
//                                 />
//                                 <div className="mt-2 sm:col-span-2 "> */}
//                                 <select
//                                   onChange={(e) =>

//                                     setAppraised(e.target.value)
//                                   }

//                                   id="teamHead"
//                                   name="teamHead"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
//                                 >
//                                   <option>
//                                     Select A User ...
//                                   </option>

//                                   {options !== null &&
//                                     options.map((option, index) => {
//                                       return (
//                                         <option
//                                           key={index}
//                                           value={option.value}
//                                         >
//                                           {option.label}
//                                         </option>
//                                       );
//                                     })}
//                                 </select>
//                               {/* </div> */}
//                               </div>
//                             </div>

//                             <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
//                               <label
//                                 htmlFor="dept-name"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 Strength
//                               </label>
//                               <div className="mt-2 sm:col-span-2">
//                                 {/* <input
//                                   //
//                                   type="text"
//                                   name="strength"
//                                   id="strength"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
//                                 /> */}
//                                 <textarea
//                                     onChange={(e) => setStrength(e.target.value)}
//                                     name="strength"
//                                     id="strength"
//                                     className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"

//                                 />
//                               </div>
//                             </div>

//                             <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
//                               <label
//                                 htmlFor="dept-name"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 Weakness
//                               </label>
//                               <div className="mt-2 sm:col-span-2">
//                                 {/* <input

//                                   type="text"
//                                   name="weakness"
//                                   id="weakness"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
//                                 /> */}
//                                 <textarea
//                                     onChange={(e) => setWeakness(e.target.value)}
//                                     name="strength"
//                                     id="strength"
//                                     className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"

//                                 />
//                               </div>
//                             </div>

//                             <div>
//                               <label
//                                 htmlFor="dept-name"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 Rating
//                               </label>
//                               <div className="mt-2 sm:col-span-2">
//                                 {/* <ReactSlider
//                                 min={0}
//                                 max={5}
//                                 defaultValue={[min, max]}
//                                 className="slider"
//                                 trackClassName="tracker"

//                                 pearling={true}
//                                 /> */}

//                                 <ReactSlider
//                                   defaultValue={[min, max]}
//                                   className="slider"
//                                   trackClassName="tracker"
//                                   min={0}
//                                   max={500}
//                                   minDistance={50}
//                                   step={50}
//                                   withTracks={true}
//                                   pearling={true}
//                                   renderThumb={(props) => {
//                                     return (
//                                       <div {...props} className="thumb"></div>
//                                     );
//                                   }}
//                                   renderTrack={(props) => {
//                                     return (
//                                       <div {...props} className="track"></div>
//                                     );
//                                   }}
//                                   onChange={([min, max]) => {
//                                     setMin(min);
//                                     setMax(max);
//                                   }}
//                                 />

//                                 <div className="values-wrapper">
//                                   <p>
//                                     Min Value:
//                                     <span>{min}</span>
//                                   </p>
//                                   <p>
//                                     Max Value:
//                                     <span>{max}</span>
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
//                               <label
//                                 htmlFor="teamhead"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 Team Head
//                               </label>
//                               <div className="mt-2 sm:col-span-2 ">
//                                 <select
//                                   onChange={(e) =>
//                                     setTeamHeadId(e.target.value)
//                                   }

//                                   id="teamHead"
//                                   name="teamHead"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
//                                 >
//                                   <option>
//                                     Select A Team Head (Manager)...
//                                   </option>

//                                   {options !== null &&
//                                     options.map((option, index) => {
//                                       return (
//                                         <option
//                                           key={index}
//                                           value={option.value}
//                                         >
//                                           {option.label}
//                                         </option>
//                                       );
//                                     })}
//                                 </select>
//                               </div>
//                             </div> */}

//                             {/* Promotion */}
//                             <div>
//                               <Switch.Group
//                                 as="div"
//                                 className="flex items-center justify-between mt-10"
//                               >
//                                 <span className="flex flex-grow flex-col">
//                                   <Switch.Label
//                                     as="span"
//                                     className="text-sm font-medium text-gray-900"
//                                     passive
//                                   >
//                                     Up for promotion
//                                   </Switch.Label>
//                                 </span>
//                                 <Switch
//                                   checked={promotion}
//                                   onChange={setPromotion}
//                                   className={classNames(
//                                     promotion ? "bg-indigo-600" : "bg-gray-200",
//                                     "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                   )}
//                                 >
//                                   <span
//                                     aria-hidden="true"
//                                     className={classNames(
//                                       promotion
//                                         ? "translate-x-5"
//                                         : "translate-x-0",
//                                       "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out"
//                                     )}
//                                   />
//                                 </Switch>
//                               </Switch.Group>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {promotion ?
//                       <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
//                               <label
//                                 htmlFor="dept-name"
//                                 className="block text-sm font-medium text-gray-700 sm:pt-2"
//                               >
//                                 State promotion reason and potential roles
//                               </label>
//                               <div className="mt-2 sm:col-span-2">
//                                 {/* <input

//                                   type="text"
//                                   name="weakness"
//                                   id="weakness"
//                                   className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
//                                 /> */}
//                                 <textarea
//                                     onChange={(e) => setReason(e.target.value)}
//                                     name="reason"
//                                     id="reason"
//                                     className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"

//                                 />
//                               </div>
//                             </div> : ""}

//                       <div className="pt-5">
//                         <div className="flex justify-end">
//                           <button
//                             ref={cancelButtonRef}
//                             onClose={onClose}
//                             type="button"
//                             className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             onClick={() =>{console.log("clicked")}}
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             type="submit"
//                             className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                           >
//                             Create
//                           </button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import Steps from "../../components/Steps";

export default function AddFinancialGoalModal({ open, onClose }) {
  const cancelButtonRef = useRef(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  //   const [promotion, setPromotion] = useState(false);
  const [interviewComments, setInterviewComments] = useState("");
  const [newPositionId, setNewPosition] = useState(-1);
  const [newDeptId, setDepartment] = useState(-1);
  const [rating, setRating] = useState(-1);
  const [manager, setManager] = useState(-1);
  const [userInQuestion, setUserInQuestion] = useState(-1);
  const [assigned, setAssigned] = useState(-1);
  const [options, setOptions] = useState(null);
  const userId = getUserId();
  const step = 1;
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

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      
  }, [userId]);

    

  const [managers, setManagers] = useState(null);
  useEffect(() => {
    const managers = async () => {
      const arr = [];
      await api.getAllManagers().then((res) => {
        let result = res.data;
        result.map((person) => {
          return arr.push({
            value: person.userId,
            label: person.firstName + " " + person.lastName,
          });
        });
        setManagers(arr);
        // console.log("fetching options...");
        // console.log(options);
        // console.log("HELLO!");
        // console.log(res);
        // console.log(res.data);
        // console.log(typeof res.data.items);
      });
    };
    managers();
  }, [userId]);

  const [hrEmployees, setHREmployees] = useState(null);
  useEffect(() => {
    const getHREmps = async () => {
      const arr = [];
      await api.getAllHREmployees().then((res) => {
        let result = res.data;
        result.map((person) => {
          return arr.push({
            value: person.userId,
            label: person.firstName + " " + person.lastName,
          });
        });
        setHREmployees(arr);
        // console.log("fetching options...");
        // console.log(options);
        // console.log("HELLO!");
        // console.log(res);
        console.log(res.data);
        // console.log(typeof res.data.items);
      });
    };
    getHREmps();
  }, [userId]);

//   const [openPostings, setOpenPostings] = useState(null);
//   useEffect(() => {
//     const getAllOpenJobPostings = async () => {
//       const arr = [];
//       await api.getAllOpenPosts().then((res) => {
//         let result = res.data;
//         result.map((posting) => {
//           return arr.push({
//             value: posting.postingId,
//             label: posting.jobTitle,
//           });
//         });
//         setOpenPostings(arr);
//         // console.log("fetching options...");
//         // console.log(options);
//         // console.log("HELLO!");
//         // console.log(res);
//         console.log(res.data);
//         // console.log(typeof res.data.items);
//       });
//     };
//     getAllOpenJobPostings();
//   }, [userId]);

  const [departments, setDepartments] = useState(null);
  useEffect(() => {
    const getDepartments = async () => {
      const arr = [];
      await api.getAllDepartments().then((res) => {
        let result = res.data;
        result.map((department) => {
          return arr.push({
            value: department.departmentId,
            label: department.departmentName,
          });
        });
        setDepartments(arr);
        // console.log("fetching options...");
        // console.log(options);
        // console.log("HELLO!");
        // console.log(res);
        console.log(res.data);
        // console.log(typeof res.data.items);
      });
    };
    getDepartments();
  }, [userId]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    api.getUser(getUserId()).then((response) => setUser(response.data));
  }, []);



  //   const handleSubmit = (evt) => {
  //     evt.preventDefault();
  //     api.createPromotionRequest().then((response) => {
  //       console.log(response.data);
  //       alert("Promotion Req has been added");
  //     });
  //   };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //method for add
    createPromotionRequest();
    onClose();
    alert("Promotion request has been successfully added.");
    window.location.reload();
  };

  function createPromotionRequest(){
    api.createPromotionRequest(userInQuestion, userId, newDeptId, assigned, interviewComments).then((response) => {
        console.log(response.data);
        alert("Promotion Request has been created successfully. Request is currently processed.");
      });
  }

  return (
    user && (
      <>
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
                  <form onSubmit={handleSubmit}>
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                      {open && <Steps completion={"12%"} step={step} />}
                      <div>
                        {/* <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    > */}
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                            <div>
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Create a new Promotion Request
                              </h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Create a new promotion request for an employee
                                that has 2 or more outstanding performance
                                ratings
                              </p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                <label
                                  htmlFor="promotion-request"
                                  className="block text-sm font-medium text-gray-700 sm:pt-2"
                                >
                                  Promotion request for
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
                                    onChange={(e) => {
                                      setUserInQuestion(e.target.value);
                                      console.log(userInQuestion);
                                    }}
                                    id="promotingUser"
                                    name="promotingUser"
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                  >
                                    <option>Select A User ...</option>

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

                              {/* Managers */}
                              <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                  <label
                                    htmlFor="managers"
                                    className="block text-sm font-medium text-gray-700 sm:pt-2"
                                  >
                                    Manager In charge
                                  </label>
                                  <div className="mt-2 sm:col-span-2">
                                    <text>{user.firstName} {user.lastName}</text>
                                    {/* <select
                                      onChange={(e) => {
                                        setManager(e.target.value);
                                        console.log(manager);
                                      }
                                        
                                      }
                                      id="managers"
                                      name="managers"
                                      className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    >
                                      <option>Select A Manager ...</option>

                                      {managers !== null &&
                                        managers.map((option, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={option.value}
                                            >
                                              {option.label}
                                            </option>
                                          );
                                        })}
                                    </select> */}
                                    {/* </div> */}
                                  </div>
                                </div>
                              </div>

                              {/* Assign to  */}
                              <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                  <label
                                    htmlFor="dept-name"
                                    className="block text-sm font-medium text-gray-700 sm:pt-2"
                                  >
                                    Assign to
                                  </label>
                                  <div className="mt-2 sm:col-span-2">
 
                                    <select
                                      onChange={(e) => {
                                        
                                        setAssigned(e.target.value);
                                        console.log(assigned);
                                      }
                                     

                                      }
                                      id="assignedHr"
                                      name="assignedHr"
                                      className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    >
                                      <option>Select A HR Employee ...</option>

                                      {hrEmployees !== null &&
                                        hrEmployees.map((option, index) => {
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
                              </div>

                              {/* New Department */}
                              <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                  <label
                                    htmlFor="dept-name"
                                    className="block text-sm font-medium text-gray-700 sm:pt-2"
                                  >
                                    New Department
                                  </label>
                                  <div className="mt-2 sm:col-span-2">
                                    <select
                                      onChange={(e) => {
                                        setDepartment(e.target.value);
                                        console.log(newDeptId);
                                      }}
                                      id="department"
                                      name="department"
                                      className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    >
                                      <option>Select Department ...</option>

                                      {departments !== null &&
                                        departments.map((option, index) => {
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
                              </div>

                              {/* New position */}
                              {/* <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                  <label
                                    htmlFor="pos-name"
                                    className="block text-sm font-medium text-gray-700 sm:pt-2"
                                  >
                                    New Job Position
                                  </label>
                                  <div className="mt-2 sm:col-span-2">
                                    <select
                                      onChange={(e) =>
                                        setNewPosition(e.target.value)

                                      }
                                      id="position"
                                      name="position"
                                      className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                    >
                                      <option>
                                        Select Open Job Posting ...
                                      </option>

                                      {openPostings !== null &&
                                        openPostings.map((option, index) => {
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
                              </div> */}

                              {/* Interview Comments */}
                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
                                <label
                                  htmlFor="interview"
                                  className="block text-sm font-medium text-gray-700 sm:pt-2"
                                >
                                  Interview Comments
                                </label>
                                <div className="mt-2 sm:col-span-2">
                                  <textarea
                                    onChange={(e) =>
                                      setInterviewComments(e.target.value)
                                    }
                                    name="interviewComments"
                                    id="interviewComments"
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
                                  />
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
                              {/* <div>
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
            promotion
              ? "bg-indigo-600"
              : "bg-gray-200",
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
    </div> */}
                            </div>
                          </div>
                        </div>

                        {/* Promotion justifications */}
                        {/* {promotion ? (
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 mt-0">
        <label
          htmlFor="dept-name"
          className="block text-sm font-medium text-gray-700 sm:pt-2"
        >
          State promotion reason and potential roles
        </label>
        <div className="mt-2 sm:col-span-2">
         
          <textarea
            onChange={(e) => setReason(e.target.value)}
            name="reason"
            id="reason"
            className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
          />
        </div>
      </div>
    ) : (
      ""
    )} */}

                        <div className="pt-5">
                          <div className="flex justify-end">
                            {/* <button
      ref={cancelButtonRef}
      onClose={onClose}
      type="button"
      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {
        console.log("clicked");
      }}
    >
      Cancel
    </button> */}
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={onClose}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={onClose}
                            >
                              Create
                            </button>
                          </div>
                        </div>
                        {/* </form> */}
                      </div>
                      {/* <div className="bg-white sm:flex sm:flex-row justify-center sm:px-6">
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onClose}
      >
        Create
      </button>
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onClose}
        ref={cancelButtonRef}
      >
        Cancel
      </button>
    </div> */}
                    </Dialog.Panel>
                  </form>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    )
  );
}
