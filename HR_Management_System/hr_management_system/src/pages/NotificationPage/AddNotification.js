import Navbar from "../../components/Navbar.js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api.js";
import loading from "../../assets/Spinner.svg";
import "../../utils/Common.js";

export default function AddNotification(props) {
  const [user, setUser] = useState(getUserId()); //logged in user
  const result = user.split(";");
  const userId = result[0];
  const [userInfo, setUserInfo] = useState([]);

  //        const [tab, setTab] = useState(tabs[0])
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState(-1);
  const [type, setType] = useState("Info");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(userInfo.authorities);
    const boo = window.confirm("Are you sure you want to submit?");
    console.log("are you here");
    if (boo) {
      api
        .addNotification(title, description, parseInt(users))
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {
          //history.push("/home");
        });
    }
  };

  //   useEffect(() => {
  //     async function getUserInfo() {
  //       await api.getUserInfo(userId).then((response) => {
  //         setUserInfo(response.data);
  //         // console.log(userInfo);
  //       });
  //     }
  //     getUserInfo();
  //   }, [userId, userInfo]);

  const [options, setOptions] = useState(null);
  useEffect(() => {
    const staff = async () => {
      const arr = [];
      await api
        .getAllStaff()
        .then((response) => {
          let result = response.data;
          result.map((staff) => {
            return arr.push({
              value: staff.userId,
              label: staff.firstName + " " + staff.lastName,
            });
          });
          console.log(response.data);
          setOptions(arr);
        })
        .catch((error) => {
          alert("Unable to get all staff right now");
        });
    };
    staff();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="items-baseline bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
        <button
          className=" h-10 w-20 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full"
          onClick={() => history.goBack()}
        >
          Back
        </button>

        <div className="m-10 p-24 mx-auto max-w-[550px]  box-border border-2">
          <span className="text-medium">
            <b>Add Notification</b>
          </span>
          {/* change name, phone, email and password only?*/}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6 mt-10"
          >
            <div>
              <label htmlFor="title">Title:</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
              />
            </div>

            <div>
              <label htmlFor="description">Description:</label>

              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id="description"
                className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm px-2"
              />
            </div>

            {/* <div>
              <label
                htmlFor="type"
                // className="block text-sm mt-5 font-medium text-gray-700"
              >
                Type:
              </label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white"
                value={type}
                onChange={(t) => setType(t.target.value)}
              >
                <option>Info</option>
                <option>Alert</option>
                <option>Error</option>
              </select>
            </div> */}

            <div>
              <label htmlFor="staff">Staff:</label>
              </div>
              <div>
              <select
                onChange={(e) => setUsers(e.target.value)}
                // placeholder="Select a Manager (might take a while...)"
                id="staff"
                name="staff"
                className="rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              >
                <option>Select Staff...</option>

                {options !== null &&
                  options.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    //   ) : (
    //     <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    //       <img className="h-full w-auto" src={loading} alt="" />
    //     </div>
    //   )}
  );
}
