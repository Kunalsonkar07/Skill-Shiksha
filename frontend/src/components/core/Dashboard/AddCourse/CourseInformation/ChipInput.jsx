import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"

const ChipInput = ({name,placeholder,label,register,errors,setValue,getValues}) => {

    const {course,editCourse}=useSelector( (state)=>state.course);

    const [chips, setChips] = useState([])

    useEffect(() => {
      if (editCourse) {
        // console.log(course)
        setChips(course?.tag)
      }
      register(name, { required: true, validate: (value) => value.length > 0 })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    useEffect(() => {
      setValue(name, chips)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])
  

    const handleKeyDown = (event) => {
        // Check if user presses "Enter" or ","
        // console.log(event.key);
        if (event.key === "Enter" || event.key === ",") {
          // Prevent the default behavior of the event
          event.preventDefault()
          // Get the input value and remove any leading/trailing spaces
          const chipValue = event.target.value.trim()
          // Check if the input value exists and is not already in the chips array
          if (chipValue && !chips.includes(chipValue)) {
            // Add the chip to the array and clear the input
            const newChips = [...chips, chipValue]
            setChips(newChips)
            event.target.value = ""
          }
        }
      }

      const handleDeleteChip = (index) => {
        const temp = [...chips];  // Create a shallow copy of the array
        temp.splice(index, 1);    // Remove the chip at the given index
        setChips(temp);           // Update the state with the new array
    }


 return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-[#F1F2FF]" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the chips array and render each chip */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-[#F1F2FF]"
          >
            {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full text-white bg-[#2C333F] p-3 rounded-md border-b-4 border-t-2 border-[#7b8fd9] focus:border-2 outline-none"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default ChipInput
