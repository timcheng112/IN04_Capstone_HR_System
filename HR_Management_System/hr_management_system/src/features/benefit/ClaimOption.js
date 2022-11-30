import {
  EyeIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import CheckDialog from "./CheckDialog";
import { useHistory } from 'react-router-dom';
import ViewClaim from "./ViewClaim";

export default function BenefitPlanOption({ claim, refreshKeyHandler}) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [trash, setTrash] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function withdraw(){
    api.withdrawClaim(claim.claimId)
    .then(() => {
        alert("Successfully withdraw.");
        refreshKeyHandler();
    })
    .catch((error) => setError(error));
  }

  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setOpen(true)}
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">View</span>
        </button>
        {user !== null && user.userId === claim.benefitPlanInstance.planOwner.userId && claim.claimStatus === "PENDING" && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setTrash(true)}
        >
          <MinusIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Withdraw</span>
        </button>}
      
      </div>
      <ViewClaim open={open} setOpen={setOpen} claim={claim} refreshKeyHandler={refreshKeyHandler} />
      <CheckDialog 
          title="Claim"
          item="Claim"
          open={trash}
          onClose={() => setTrash(false)}
          setOpen={() => setTrash(false)}
          onConfirm={withdraw}
        />
    </div>
  )

}