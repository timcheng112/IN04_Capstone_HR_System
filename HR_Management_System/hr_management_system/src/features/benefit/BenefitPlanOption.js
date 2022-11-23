import {
  EyeIcon,
  PlusIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import ViewPlan from "./ViewPlan";
import AddNewClaim from "./AddNewClaim";
import CheckDialog from "./CheckDialog";
import { useHistory } from 'react-router-dom';

export default function BenefitPlanOption({ plan }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [claim, setClaim] = useState(false);
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

  function terminate(){
    api.terminateBenefitPlan(plan.planId)
    .then(() => {alert("Successfully terminated.");})
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
          <span className="hidden md:block">Detail</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setClaim(true)}
        >
          <PlusIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Claim</span>
        </button>
        {plan.isActive && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setTrash(true)}
        >
          <NoSymbolIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Terminate</span>
        </button>}
      </div>
      <AddNewClaim open={claim} setOpen={setClaim} plan={plan}/>
      <ViewPlan open={open} setOpen={setOpen} plan={plan}/>
      <CheckDialog 
          title="Plan"
          item="Plan"
          open={trash}
          onClose={() => setTrash(false)}
          setOpen={() => setTrash(false)}
          onConfirm={terminate}
        />
    </div>
  )

}