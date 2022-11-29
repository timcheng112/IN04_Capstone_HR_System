import Navbar from "../../components/Navbar";
import Department from "../../components/ComboBox/Department";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NewReviewForm() {
  const history = useHistory();
  const [department, setDepartment] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [rate, setRate] = useState(1);
  const [justification, setJustification] = useState("");
  const [team, setTeam] = useState("");

  function submit(){
    console.log(department)
    api.submitReviewForm(name, rate, justification, department.departmentId, team) 
    .then(() => {alert("Successfully submit.");})
    .catch((error) => setError(error));
    history.push("/")
  }

  return (
    <div className="">
      <Navbar />
      <div className="py-5"></div>
      <form className="space-y-8 divide-y divide-gray-200" >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Employee Review Form</h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="justification" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Employee Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="justification"
                    name="justification"
                    required
                    type='text'
                    value={name}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="justification" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Rate
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="justification"
                    name="justification"
                    type='number'
                    min='1'
                    max='5'
                    required
                    value={rate}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="justification" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Justification
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="justification"
                    name="justification"
                    rows={5}
                    required
                    value={justification}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setJustification(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Department
                </label>
                <Department selectedDepartment={department} setSelectedDepartment={setDepartment}/>
              </div>


              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Team
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="justification"
                    name="justification"
                    value={team}
                    type='text'
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setTeam(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => history.push("/")}
            >
              Back
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => submit()}
            >
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
