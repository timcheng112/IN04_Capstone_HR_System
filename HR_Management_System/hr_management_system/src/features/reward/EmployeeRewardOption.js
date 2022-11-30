import {
  EyeIcon,
  BoltIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from 'react-router-dom';

export default function EmployeeRewardOption({ reward, refreshKey, refreshKeyHandler }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [claimDate, setClaimDate] = useState();
  const [uId, setUId] = useState(getUserId());
  const [userClaimed, setUserClaimed] = useState(false);
  const [refreshKey2, setRefreshKey2] = useState(0);
  const [rewardImg, setRewardImg] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
        if (reward.img !== null) {
            api.getDocById(reward.image.docId).then((response) => {
                const url = window.URL.createObjectURL(response.data);
                setRewardImg(url);
            })
        }
      })
      .catch((error) => setError(error));
  }, []);

  function redeem() {
    api.redeemReward(reward.rewardId, getUserId())
        .then((response) => {
            alert(response.data);
            refreshKeyHandler();

            setTimeout(() => {  setRefreshKey2((oldKey) => oldKey + 1); }, 500);
        })
        .catch((error) => {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        })
  }

  useEffect(() => {
    reward.rewardInstances.forEach((instance) => {
        console.log("instance");
        console.log(instance.recipient.userId);
        if (uId == instance.recipient.userId) {
            console.log("REDEEMED");
            setUserClaimed(true);
            setClaimDate(instance.dateClaimed);
        }
    });
  }, [refreshKey2]);

  return (
    <div>
        {rewardImg !== null && <div className="flex justify-center mt-1 object-scale-down h-36 w-72 pb-2">
            <img
              src={rewardImg}
              alt=""
            />
          </div>}
      <div className="space-x-4">
        {!userClaimed && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={()=> redeem()}
        >
          <BoltIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Redeem</span>
        </button>}
        {userClaimed && <p> Claim on {claimDate} </p>}
      </div>
      
    </div>
  )

}