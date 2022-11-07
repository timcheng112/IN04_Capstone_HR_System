
import EmptyStateAdd from "./EmptyStateAdd";
import AddRecommendation from "./AddRecommendation";
import { Fragment, useState } from 'react'
import api from "../../utils/api";
import { getUserId } from "../../utils/Common.js";
import RecommendationButton from './RecommendationButton';

export default function RecommendationList({
  templateRecommendations, refreshKeyHandler
}){
  const [addRecommendation, setAddRecommendation] = useState(false)
  const [user, setUser] = useState(getUserId());
  const [error, setError] = useState();

  return (
    
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-3/4">
      {templateRecommendations.map((r) => (
        <div>
        <li
          key={r.recommendationId}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex-col w-full p-6">
            <div className="truncate">
              <div className="flex space-x-3">
                <h3 className="truncate text-sm font-bold text-gray-900">
                  {r.name}
                </h3>
                {/* <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {work.positionName}
                </span> */}
              </div>
            </div>
            <div className="truncate">
              <div className="flex space-x-3">
                <p className="mt-1 truncate text-sm text-gray-900">
                  {r.email}
                </p>
              </div>
            </div>
          </div>
          <RecommendationButton r={r} refreshKeyHandler={refreshKeyHandler}/>
          
        </li>
        </div>
      ))}
      <li className="col-span-1 divide-y divide-gray-200 rounded-lg shadow">
        <EmptyStateAdd onOpen={()=>setAddRecommendation(true)} itemName="Recommendation" />
      </li>
      <AddRecommendation open ={addRecommendation} setOpen={() => setAddRecommendation(false)} refreshKeyHandler={refreshKeyHandler}/>
    </ul>
  );
}
