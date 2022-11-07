import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select';
import { CheckIcon, ChevronUpDownIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddSkillset = ({ userSkills, setUserSkills, skills, uss, setUSS}) => {

  // const userSkills = [{ skill: skills[0], level: 1 }, { skill: skills[1], level: 3 }]

  useEffect(() => {
    console.log("CCCC");
    console.log(userSkills);
    userSkills.map((element) => (
      console.log(element.skillset)
    ))
    console.log(skills);
    console.log(uss);
    console.log(typeof uss[0].level);
  }, []);

  const options = skills.map(skill => ({
    "value": skill.skillsetName,
    "label": skill.skillsetName
  }))

  let handleChange = (i, e) => {
    console.log(e.target.value);
    let newFormValues = [...uss];
    newFormValues[i][e.target.name] = e.target.value;
    setUSS(newFormValues);
  }
  let handleSelect = (i, e) => {
    let newFormValues = [...uss];
    newFormValues[i]['skill'] = e.value;
    console.log(newFormValues[i]['skill'])
    setUSS(newFormValues);
  }

  let addFormFields = () => {
    setUSS([...uss, { skill: "", level: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...uss];
    newFormValues.splice(i, 1);
    setUSS(newFormValues)
  }

  return (
    <form  >
      {uss.map((element, index) => (

        <div className="display: flex flex-flow: row wrap align-items: center" key={index}>
          <div className="flex space-x-4 py-2">
            <Select
              value={{label:element.skill}}
              options={options}
              className="w-64"
              onChange={e => handleSelect(index, e)}
            >
            </Select>
            <input
              className="block w-30 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
              type="number"
              min={1}
              max={5}
              name="level"
              value={element.level || ""}
              placeholder='Level 1-5'
              onChange={e => handleChange(index, e)} />


            <button
              type="button"
              className="inline-flex  rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => removeFormFields(index)}
            >
              <XMarkIcon
                className="md:-ml-0.5 md:mr-2 h-4 w-4"
                aria-hidden="true"
              />
              <span className="hidden md:block">Remove</span>
            </button>
          </div>
        </div>
      ))}
      <div className="flex">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => addFormFields()}
        >
          <PlusIcon
            className="md:-ml-0.5 md:mr-2 h-4 w-4"
            aria-hidden="true"
          />
          <span className="hidden md:block">Add Skill</span>
        </button>
      </div>

    </form>
  )
}

export default AddSkillset