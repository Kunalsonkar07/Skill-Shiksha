import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import Button from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='flex gap-24 mt-11 mx-auto items-center justify-center'>   
        <div className='w-[45%] shadow-white shadow-[20px_20px_0px_0px] object-cover lg:h-fit'>
            <img src={instructor}></img>
        </div>
        <div className='w-[45%] flex flex-col items-start'>
            <div className='font-bold text-3xl'>
            Become an 
            <br/>
            <HighlightText text={"instructor"}/>
            </div> 
            <p className='text-[#999DAA] mt-3 mb-14 w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <Button active={true} linkto={"/signup"}>
                <div className='flex items-center gap-2'>
                    Start Teaching Today
                    <FaArrowRight />
                </div>
            </Button>
        </div>
    </div>
  )
}

export default InstructorSection