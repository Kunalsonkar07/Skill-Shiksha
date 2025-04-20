import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { MdNavigateNext, MdToken } from "react-icons/md"
import IconBtn from '../../../../common/IconBtn';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state)=>state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state)=>state.auth);

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName)
    {
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        },token
      )
    }
    else
    {
      result= await createSection(
        {
          sectionName:data.sectionName,
          courseId:course._id,
        },token
      )
    }

    if(result)
    {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }
    setLoading(false);
  };

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }


  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = ()=>{
    if(course.courseContent.length === 0)
    { 
       toast.error("Please add atleast one section");
       return;
    }
   
    if(course.courseContent.some( (section)=> section.subSection.length === 0))
    {
        toast.error("Please add atleast one lecture in each section");
        return;
    }
  
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId)
    {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName","");
  }

  return (
    <div>
      <div className='bg-[#161D29] p-6 flex flex-col gap-5'>
        <h1 className='text-xl font-bold'>Course Builder</h1>

        <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
        >
          <div>
            <input
              placeholder='Add a section to build your course'
              {...register("sectionName", { required: true })}
              className='text-[#999DAA] bg-richblack-700 p-2 rounded-md  
              border-b-2 border-white focus:border-2 outline-none w-full'
            />
            {errors.sectionName && (
              <p className='text-pink-300 text-sm'>Section name is required</p>
            )}
          </div>

          <div className='flex gap-2'>
            <button
              type='submit'
              className='text-yellow-50 p-2 border-2 
              flex items-center justify-center gap-1 border-yellow-50  max-w-max rounded-md'
              >
              <FaPlusCircle />
              {editSectionName ? "Edit Section Name" : "Add Section"}
            </button>

            {editSectionName && (
              <button onClick={cancelEdit}
              className='text-sm text-richblack-300 underline
              mt-auto '
              >
                  Cancel Edit
              </button>
            )}
          </div>
        </form>
          {course.courseContent.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}


      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3 mt-6 mb-9">
              <button
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Back
              </button>
              <IconBtn disabled={loading} text="Next" onclick={goToNext}>
                <MdNavigateNext />
              </IconBtn>
      </div>

      </div>    
</div>
    )
}

export default CourseBuilderForm;



