import Navbar from "../../../components/Navbar.js";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { useState, useEffect } from "react";

import AddDepartmentModal from "./addDeptModal.js";
import { useHistory } from "react-router-dom";
import DeleteDeptModal from "./deleteDeptModal.js";

import ChangeOrgHeadModal from "./changeOrgHeadModal.js";
import { getUserId } from "../../../utils/Common.js";

/* Requires Tailwind CSS v2.0+ */
//TODO: fix org.organization.Head.positions & department, status active
//TODO: add modals for change org head, disable dept
//TODO: failure case for disable.. need popup? or need another modal answer: alert()? idk theres a warning thing somewhere.
//TODO: link view button to next page(?)
//consider using useEffect to minimize refreshes

//TODO: UPDATE TABLE WHEN ADDING DEPT ETC? anyway to just update the list without refreshing the whole page? look into!

export default function ViewOrganisation() {
  const userId = getUserId()
  const [org, setOrg] = useState([]);
  const history = useHistory();
  const [toDelete, setToDelete] = useState(0)

  useEffect(() => {
    api.getOrganization().then((response) => {
      setOrg(response.data);
      //console.log(org);
      //console.log(response.data.departments[0].departmentId);
    });
  }, [org]);
  //what is this [org] for?

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [openChange, setOpenChange] = useState(false);
  const [deptName, setDeptName] = useState("");

  function deleteDept() {
    console.log("delete department " + toDelete)
    // console.log("adddeptfunc :" + deptName + " " + deptHeadId);
    api
      .deleteDept(toDelete)
      .then((response) => {
        console.log('deleted? ' + response.data);
        // api.getOrganization().then((response) => {
        //   setOrg(response.data);
        // });
        setToDelete('')
      })
      .catch((error) => {
        var message = error.request.response;
        if (message.includes("Department still has teams unable to delete"))
        console.log(message);
        alert("Department still has teams");
      });
  }

  return (
    <>
      {org.organizationHead ? (
        <>
          <Navbar />
          <AddDepartmentModal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
          />

          <DeleteDeptModal
            open={openDelete}
            onClose={() => setOpenDelete(false)}
          />

          <ChangeOrgHeadModal
            newOrgName={org.organizationName}
            open={openChange}
            onClose={() => setOpenChange(false)}
          />

          <div className="bg-[#13AEBD] rounded-xl p-10 m-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Libro Private Limited
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the departments in the Libro including their
                    name and supervisor.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    onClick={() => setOpenAdd(true)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Add Department
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Organisation Head
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              {/*Position*/}
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              {/*Status*/}
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr key={org.organizationHead.userId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  {/*}
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={org.organizationHead.profilePic}
                                    alt="img"
                                  />
      */}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {org.organizationHead.firstName +
                                      " " +
                                      org.organizationHead.lastName}
                                  </div>
                                  <div className="text-gray-500">
                                    {org.organizationHead.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                {/*org.organizationHead.positions*/}
                              </div>
                              <div className="text-gray-500">
                                {/*org.organizationHead.department*/}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {/*Active*/}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  setOpenChange(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Change
                                <span className="sr-only">
                                  , {org.organizationHead.firstName}
                                </span>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Department Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Department Head
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              {/*Position*/}
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Disable</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {org.departments.map((dept, deptIdx) => (
                            <tr
                              key={dept.departmentId}
                              className={
                                deptIdx % 2 === 0 ? undefined : "bg-gray-50"
                              }
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {dept.departmentName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {dept.departmentHead.firstName +
                                  " " +
                                  dept.departmentHead.lastName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {/*dept.position*/}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                {/*THE VIEW BUTTON IS HERE!!!!*/}
                                <button
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() =>
                                    history.push(
                                      "/viewDept/" + dept.departmentId
                                    )
                                  }
                                >
                                  View
                                  <span className="sr-only">, {dept.name}</span>
                                </button>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  onClick={() => {
                                    setOpenDelete(true);
                                    setToDelete(dept.departmentId)
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Delete
                                  <span className="sr-only">, {dept.name}</span>
                                </a>
                                <DeleteDeptModal
                                  open={openDelete}
                                  onConfirm={deleteDept}
                                  setOpen={setOpenDelete}
                                  deptId={dept.departmentId}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-cyan-300">
          <div className="font-mono absolute mx-auto text-center w-screen text-6xl mt-9">
            <h1>loading...</h1>
          </div>
          <img
            className="object-scale-down h-screen mx-auto"
            src="https://acegif.com/wp-content/uploads/gif/hamster-wheel-46.gif"
            alt="loading..."
          ></img>
        </div>
      )}
    </>
  );
}
