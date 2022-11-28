import {
  EyeIcon,
  CheckIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from 'react-router-dom';
import ViewReview from "./ViewReview";

export default function ReviewFormOption({ review }) {
  const history = useHistory();
  const [trash, setTrash] = useState(false);
  const [open, setOpen] = useState(false);
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

  // function terminate(){
  //   api.terminateBenefitPlan(plan.benefitPlanId)
  //   .then(() => {alert("Successfully terminated.");})
  //   .catch((error) => setError(error));
  // }

  return (
    <div>
      <div className="space-x-4">
        <button
          type="button"
          onClick={()=>setOpen(true)}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <EyeIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Detail</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setTrash(true)}
        >
          <CheckIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Vet</span>
        </button>
        <ViewReview open={open} setOpen={setOpen} review={review}/>
      </div>

    </div>
  )

}