import Navbar from "../../components/Navbar";
import RewardList from "../../features/reward/RewardList";
import AddNewReward from "../../features/reward/AddNewReward";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useLocation } from 'react-router-dom';
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import {
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TrackDetail() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState('');
  const [ratio, setRatio] = useState(null);
  const history = useHistory();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setName(location.state.track.name);
    setRatio(location.state.track.pointsRatio);
    setStartDate(new Date(location.state.track.startDate));
    setEndDate(new Date(location.state.track.endDate));
  }, []);

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   var result = 0;
  //   if (useState.button === 1) {
  //     result = saveRequest();
  //   }
  //   if (useState.button === 2) {
  //     result = submitRequest();
  //   }
  //   if (result === 0) {
  //     user !== null && user.hrEmployee ? (history.push("/hiring/jobrequesthr")) : (history.push("/hiring/jobrequest"))
  //   }
  // };


  return (
    <div className="">
      <Navbar />
      <div className="py-5"></div>
      <form className="space-y-8 divide-y divide-gray-200" >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Reward Track Detail</h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={name}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Points Ratio
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      placeholder="0.00"
                      value={ratio}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setRatio(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Start Date
                </label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  End Date
                </label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Rewards
                </label>
                <div className="flex space-x-8">
                  <RewardList />
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-10"
                  >
                    <PlusIcon
                      className="md:-ml-0.5 md:mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Add
                  </button>
                  <AddNewReward open={open} setOpen={setOpen}/>
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
              onClick={() => user !== null && user.hrEmployee ? (history.push("/welfare/rewardtrack")) : (history.push("/welfare/rewardtrack"))}
            >
              Back
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            //onClick={() => (useState.button = 1)}
            >
              Save
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            //onClick={() => (useState.button = 2)}
            >
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}