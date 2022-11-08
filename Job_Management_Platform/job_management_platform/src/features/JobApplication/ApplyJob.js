import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ArrowUpTrayIcon, ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import api from "../../utils/api.js";
import { getUserId } from "../../utils/Common.js";
import { format } from "date-fns";


export default function ApplyJob({ open, setOpen, job }) {
  const cancelButtonRef = useRef(null)
  const [availableDate, setAvailableDate] = useState(new Date());

  const [user, setUser] = useState(getUserId()); //logged in user
  const [userQualificationInfo, setUserQualificationInfo] = useState(null);
  const [cvfile, setcvFileState] = useState(null);
  const [cvfileName, setcvFileName] = useState(null);
  const [clfile, setclFileState] = useState(null);
  const [clfileName, setclfileName] = useState(null);
  const [tfile, settFileState] = useState(null);
  const [tfileName, settfileName] = useState(null);
  const [cvId, setCVId] = useState('');
  const [clId, setCLId] = useState('');
  const [tId, setTId] = useState('');
  const [curcvfileName, setcurcvFileName] = useState(null);
  const [curclfileName, setcurclfileName] = useState(null);
  const [curtfileName, setcurtfileName] = useState(null);
  const [docId, setDocId] = useState(null);
  const [fName, setFName] = useState(null);

  useEffect(() => {
    console.log("getting user info")
    api.getUserQualificationInformation(user).
        then((response) => {
          console.log(response.data);
          setUserQualificationInfo(response.data);

          if (response.data.cv === null) {
            console.log("cv dont exist");
          } else {
            console.log("cv exist");
            setcurcvFileName(response.data.cv.name);
            setCVId(response.data.cv.docId);
          }
//          if (response.data.coverLetter === null) {
//            console.log("cover letter dont exist");
//          } else {
//            console.log("cover letter exist");
//            setcurclfileName(response.data.coverLetter.name);
//            setCLId(response.data.coverLetter.docId);
//          }
          if (response.data.transcript === null) {
            console.log("transcript dont exist");
          } else {
            console.log("transcript exist");
            setcurtfileName(response.data.transcript.name);
            setTId(response.data.transcript.docId);
          }
        });
  }, []);

  useEffect(() => {
    console.log("new avail date is :");
    console.log(availableDate);

    let newDate = format(availableDate, "yyyy-MM-dd");
    console.log(newDate);
  },[availableDate]);

  function downloadFile(fileType) {
//     console.log("DDDDDDOWNLOAD");
//     console.log(cvId);
//     console.log(curfileName);
//     console.log(fileType);

     var docToGet;
     if (fileType === "CV") {
        docToGet = cvId;
        setFName(curcvfileName);
     } else if (fileType == "CL") {
        docToGet = clId;
        setFName(curclfileName);
     } else if (fileType == "T") {
        docToGet = tId;
        setFName(curtfileName);
     }

     api.downloadDocument(docToGet).then((response) => {
//       console.log(docId);
       const fileName =
         response.headers["content-disposition"].split("filename=")[1];
//       console.log(fileName);
       api.getDocById(docToGet).then((response) => {
         //console.log(response.data);
         const url = window.URL.createObjectURL(response.data);

         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", fName);
         document.body.appendChild(link);
         link.click();
         link.parentNode.removeChild(link);
       });
     });
   }

  function handleFile(e) {
      console.log(e.target.files, "--");
      console.log(e.target.files[0], "$SSSSS$");
      setcvFileState(e.target.files[0]);
      setcvFileName(e.target.files[0].name);
    }

  function uploadFile(type) {
  //    console.log("upload file")
      let formData = new FormData();
      if (cvfile) {
        formData.append("file", cvfile);
        try {
          api
            .uploadDocument(formData, user, type)
            .then((response) => {
              // console.log(response.data)
              if (response.status === 200) {
                //should return a long id
                setDocId(response.data);
                // setDocId(response.data)
  //              console.log(userInfo);
                alert("CV added to user succesfully");
              }
              setcurcvFileName(cvfileName);
              setcvFileName(null);
              setcvFileState(null);
            })
            .catch((error) => {
              console.log(error.response);
            });
        } catch (err) {
          console.log("There was a problem with upload..");
          console.log(err);
        }
      } else {
        alert("No file uploaded");
      }}

  function handleclFile(e) {
  //    console.log("handle file")
  //    console.log(e.target.files, "--");
  //    console.log(e.target.files[0], "$SSSSS$");
      setclFileState(e.target.files[0]);
      setclfileName(e.target.files[0].name);
    }

    function uploadclFile(type) {
      //      e.preventDefault();
  //    console.log("upload file")
  //    console.log(clfile)

//      let formData = new FormData();
      if (clfile) {
        alert("File Attached");
//        formData.append("file", clfile);

//        try {
//          api
//            .uploadDocument(formData, user, type)
//            .then((response) => {
//              // console.log(response.data)
//              if (response.status === 200) {
//                //should return a long id
//                setDocId(response.data);
//                // setDocId(response.data)
//  //              console.log(userInfo);
//                alert("Cover Letter added to user succesfully");
//              }
//              setclFileState(null);
//              setcurclfileName(clfileName);
//              setclfileName(null);
//            })
//            .catch((error) => {
//              console.log(error.response);
//            });
//        } catch (err) {
//          console.log("There was a problem with upload..");
//          console.log(err);
//        }
      } else {
        alert("No file uploaded");
      }
    }


    function handletFile(e) {
  //    console.log("handle file")
  //    console.log(e.target.files, "--");
  //    console.log(e.target.files[0], "$SSSSS$");
      settFileState(e.target.files[0]);
      settfileName(e.target.files[0].name);
    }

    function uploadtFile(type) {
      //      e.preventDefault();
  //    console.log("upload file")
  //    console.log(tfile)

      let formData = new FormData();
      if (tfile) {
        formData.append("file", tfile);

        try {
          api
            .uploadDocument(formData, user, type)
            .then((response) => {
              // console.log(response.data)
              if (response.status === 200) {
                //should return a long id
                setDocId(response.data);
                // setDocId(response.data)
  //              console.log(userInfo);
                alert("Transcript added to user succesfully");
              }
              setcurtfileName(tfileName);
              settFileState(null);
              settfileName(null);
            })
            .catch((error) => {
              console.log(error.response);
            });
        } catch (err) {
          console.log("There was a problem with upload..");
          console.log(err);
        }
      } else {
        alert("No file uploaded");
      }
    }

  function submitJob() {
    console.log("Submitting Job");
    console.log(user);
    console.log(job.postingId);
    let newDate = format(availableDate, "yyyy-MM-dd");

    let formData = new FormData();
    if (clfile) {
      formData.append("file", clfile);
    }

    api.createJobApplicationTempFix(job.postingId, user, newDate, formData)
        .then((response) => {
            console.log(response.data);
            alert("Application Successfully Registered");
        })
        .catch((error) => {
            console.log(error.response.data.message);
            alert("Error, " + error.response.data.message);
        })

    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Apply for {job.jobTitle}
                    </Dialog.Title>
                    <div className='py-2' />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-gray-500">
                          <PlusIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Available Date
                      </label>
                      <div className="mt-1">
                        <DatePicker selected={availableDate} onChange={(date) => setAvailableDate(date)}
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        CV
                      </label>
                      <div className="flex mt-1 sm:col-span-2 sm:mt-0">
                        <input
                            id="file"
                            type="file"
                            multiple
                            name="file"
                            onChange={(e) => handleFile(e)}
                          />
                        <div className="space-x-2">
                            {(cvfile !== null && cvfileName !== null) &&
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => uploadFile("CV")}
                                >
                                  <ArrowUpTrayIcon
                                    className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  <span className="hidden md:block">Upload CV</span>
                                </button>
                            }
                            {curcvfileName!==null &&
                                <>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                      Current CV : {curcvfileName}
                                    </label>
                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick = {() => downloadFile("CV")}
                                    >
                                      <ArrowDownTrayIcon
                                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                        aria-hidden="true"
                                      />
                                      <span className="hidden md:block">Download CV</span>
                                    </button>
                                </>
                            }
                        </div>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Transcript
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                            id="file"
                            type="file"
                            multiple
                            name="file"
                            onChange={(e) => handletFile(e)}
                          />
                        <div className="space-x-2">
                            {(tfile !== null && tfileName !== null) &&
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => uploadtFile("Transcript")}
                                >
                                  <ArrowUpTrayIcon
                                    className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  <span className="hidden md:block">Upload Transcript</span>
                                </button>
                            }
                            {curtfileName!==null &&
                                <>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                      Current Transcript : {curtfileName}
                                    </label>
                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick = {() => downloadFile("T")}
                                    >
                                      <ArrowDownTrayIcon
                                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                        aria-hidden="true"
                                      />
                                      <span className="hidden md:block">Download Transcript</span>
                                    </button>
                                </>
                            }
                        </div>
                      </div>
                    </div>
                    <div className='py-3' />
                    <div className="mt-2 flex space-x-4">
                      <label className="block text-sm font-medium text-gray-900">
                        Cover Letter
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                            id="file"
                            type="file"
                            multiple
                            name="file"
                            onChange={(e) => handleclFile(e)}
                          />
                        <div className="space-x-2">
                            {(clfile !== null && clfileName !== null) &&
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => uploadclFile("Cover Letter")}
                                >
                                  <ArrowUpTrayIcon
                                    className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  <span className="hidden md:block">Upload Cover Letter</span>
                                </button>
                            }
                            {curclfileName!==null &&
                                <>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                      Current Cover Letter : {curclfileName}
                                    </label>
                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick = {() => downloadFile("CL")}
                                    >
                                      <ArrowDownTrayIcon
                                        className="md:-ml-0.5 md:mr-2 h-4 w-4"
                                        aria-hidden="true"
                                      />
                                      <span className="hidden md:block">Download Cover Letter</span>
                                    </button>
                                </>
                            }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-3' />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={() => submitJob()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
