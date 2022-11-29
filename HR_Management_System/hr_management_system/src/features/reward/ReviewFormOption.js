import {
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { getUserId } from "../../utils/Common";
import { useHistory } from 'react-router-dom';
import ViewReview from "./ViewReview";
import VetReviewForm from "./VetReviewForm";

export default function ReviewFormOption({ review }) {
  const history = useHistory();
  const [vet, setVet] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [departmen, setDepartment] = useState(null);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        //        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);

  function reject(){
    api.voidReviewForm(review.reviewFormId)
    .then(() => {alert("Successfully void.");})
    .catch((error) => setError(error));
  }
  
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
        {!review.vetted && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setVet(true)}
        >
          <CheckIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Vet</span>
        </button>}
        {!review.vetted && <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => reject()}
        >
          <XMarkIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Void</span>
        </button>}
        <ViewReview open={open} setOpen={setOpen} review={review}/>
        <VetReviewForm open={vet} setOpen={setVet} review={review}/>
      </div>

    </div>
  )

}