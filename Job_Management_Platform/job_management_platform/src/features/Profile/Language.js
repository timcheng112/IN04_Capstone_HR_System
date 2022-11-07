import React, { useState, useEffect } from 'react'
import {
  PlusIcon, XMarkIcon
} from "@heroicons/react/20/solid";

export default function Language ({languages, setLanguages}){


  let handleChange = (i, e) => {
    let newFormValues = [...languages];
    newFormValues[i]= e.target.value;
    setLanguages(newFormValues);
  }

  let addFormFields = () => {
    setLanguages([...languages, "" ])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...languages];
    newFormValues.splice(i, 1);
    setLanguages(newFormValues)
  }


  return (
    <form  >
      {languages.map((element, index) => (
        <div className="" key={index}>
          <div className="flex space-x-4">
          <input
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            type="text"
            name=""
            value={element || ""}
            onChange={e => handleChange(index, e)} />

          {
            index ?
              <button
                type="button"
                className="inline-flex  rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => removeFormFields()}
              >
                <XMarkIcon
                  className="md:-ml-0.5 md:mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                <span className="hidden md:block">Remove</span>
              </button>
              : null
          }
          </div>
          <div className='py-2' />
        </div>
      ))}
      <div className="button-section">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => addFormFields()}
        >
          <PlusIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Add language spoken</span>
        </button>

      </div>
    </form >
  )
}

