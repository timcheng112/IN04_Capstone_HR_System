import React from 'react'
import { Fragment, useRef, useState } from 'react'
import Select from 'react-select';
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddSkillset = () => {

  const skills = [{ id: 1, name: 'java' }, { id: 2, name: 'python' }, { id: 3, name: 'matlab' }]
  const userSkills = [{ skill: skills[0], level: 1 }, { skill: skills[1], level: 3 }]
  const [formValues, setFormValues] = useState(userSkills)
  const options = skills.map(skill => ({
    "value" : skill.id,
    "label" : skill.name
  }))
  const levels = [{"value":1,"label":1},{"value":2,"label":2},{"value":3,"label":3},{"value":4,"label":4},{"value":5,"label":5}]
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let handleSkillChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.value] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { skill: "", level: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  return (
    <form  >
      {formValues.map((element, index) => (

        <div className="display: flex flex-flow: row wrap align-items: center" key={index}>
          <div className="flex space-x-4 py-2">
            <Select
              value={element.skill.name}
              options={options}
              className="w-64"
              
            >
            </Select>
            <input
            className="block w-30 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
            type="text"
            name="level"
            value={element.level || ""}
            placeholder='Level 1-5'
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
          <span className="hidden md:block">Add Skill</span>
        </button>
      </div>

    </form>
  )
}

export default AddSkillset