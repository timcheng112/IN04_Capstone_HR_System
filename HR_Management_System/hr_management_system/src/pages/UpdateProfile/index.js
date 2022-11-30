import Navbar from "../../components/Navbar.js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserId } from "../../utils/Common.js";
import api from "../../utils/api.js";
import loading from "../../assets/Spinner.svg";

export default function ProfilePage(props) {
  const [user, setUser] = useState(getUserId()); //logged in user
  const result = user.split(";");
  const userId = result[0];
  const [userInfo, setUserInfo] = useState([]);
  const [viewUser, setViewUser] = useState(null); //viewing other user
  //        const [tab, setTab] = useState(tabs[0])
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccNo, setBankAccNo] = useState("");

  useEffect(() => {
    api
      .getUserInfo(userId)
      .then((response) => {
        setUserInfo(response.data);

        setGender(response.data.gender);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        if (response.data.bankName != null) {
          setBankName(response.data.bankName);
          setBankAccNo(response.data.bankAccNo);
        }
      })
      .then(() => {
        console.log(email);
        console.log(userInfo);
      });
  }, [user]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(userInfo.authorities);
    // userInfo.gender = gender;
    // userInfo.email = email;
    // userInfo.phone = phone;
    api.updateUserBankInfo(userId, bankName, bankAccNo).then((res) => {
      if (res.data == true) {
        console.log("updated bank info successfully.");
      }
    });
    api
      .editUserInfo(userId, gender, email, phone)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        history.push("/profile");
      });
  };

  // function fetch(){
  //     // const updatedUserInfo = {userId, gender, email, phone }
  //     userInfo.gender = gender;
  //     userInfo.email = email;
  //     userInfo.phone = phone;
  //     api.editUserInfo( userInfo, userId)
  //      .then((response) => {console.log(response.data); })}
  // fetch();

  return (
    <>
      {userInfo && email ? (
        <>
          <Navbar />
          <div className="items-baseline bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <button
              class=" h-10 w-20 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full"
              onClick={() => history.push("/profile")}
            >
              Back
            </button>

            <div className="m-10 p-24 mx-auto max-w-[550px]  box-border border-2">
              <span class="text-medium">
                <b>Update Personal Information</b>
              </span>
              {/* change name, phone, email and password only?*/}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-y-6 mt-10"
              >
                <div>
                  <label htmlFor="gender" className="sr-only">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Gender"
                    onChange={(event) => setGender(event.target.value)}
                    value={gender}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Phone"
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bankName" className="sr-only">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="bankName"
                    onChange={(event) => setBankName(event.target.value)}
                    value={bankName}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bankAccNo" className="sr-only">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccNo"
                    id="bankAccNo"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Bank Account Number"
                    onChange={(event) => setBankAccNo(event.target.value)}
                    value={bankAccNo}
                    required
                  />
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
      ) : (
        <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <img className="h-full w-auto" src={loading} alt="" />
        </div>
      )}
    </>
  );
}
