import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import {AiFillCaretDown} from 'react-icons/ai'
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {FaPlus} from 'react-icons/fa';
import SubSectionModal from "./SubSectionModal"

const NestedView = ({ handleChangeEditSectionName }) => {
  // Accessing the course state from Redux
  const { course } = useSelector((state) => state.course);
  const {token}  = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const [sectionId,setSectionId] = useState(null);
  const [subSectionId,setSubSectionId] = useState(null);
  
  const [addSubSection,setAddSubSection] = useState(null);
  const [viewSubSection,setViewSubSection] = useState(null);
  const [editSubSection,setEditSubSection] = useState(null);

  const [confirmationModal,setConfirmationModal] = useState(false);
  const [confirmationModal1,setConfirmationModal1] = useState(false);

  const [loading,setLoading] = useState(false);

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (sectionId,subSectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal1(false);
  }


  const handler = (sectionid)=>{
    setConfirmationModal(true) 
    setSectionId(sectionid)
  }
  const handler1 = (sectionid,subSectionId)=>{
    setConfirmationModal1(true) 
    setSectionId(sectionid)
    setSubSectionId(subSectionId)
  }
  return (
    <>
    <div className='bg-[#2C333F] text-white rounded-md relative p-3'>
        {course?.courseContent.map((section)=>
            <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-[#F1F2FF]0" />
                <p className="font-semibold text-[#F1F2FF]0">
                  {section.sectionName}
                </p>
              </div>

                <div className='flex gap-2 items-center justify-center'>

                    <button onClick={()=>{handleChangeEditSectionName(section._id,section.sectionName)}}>
                        <MdEdit/>
                    </button>

                    <button>
                        <RiDeleteBin6Line onClick={()=>{handler(section._id)}}/>
                    </button>

                    <span className="font-medium text-[#838894]">|</span>
                    <AiFillCaretDown className={`text-xl text-[#838894]`} />

                </div>
                </summary>

                <div className="px-6 pb-4">
                    {section.subSection.map((data)=>(
                    <div key={data._id}
                        onClick={()=>setViewSubSection(data)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                        >
                        <div className="flex items-center gap-x-3 py-2 ">
                            <RxDropdownMenu className="text-2xl text-[#F1F2FF]0" />
                            <p className="font-semibold text-[#F1F2FF]0">
                            {data.title}
                            </p>
                        </div>
                        <div onClick={(e)=>e.stopPropagation()} className="flex items-center gap-x-3">
                            <button onClick={()=>{setEditSubSection({...data,sectionId:section._id})}}>
                                <MdEdit className="text-xl text-[#838894]" />
                            </button>
                            <button onClick={()=>{handler1(section._id,data._id)}}>
                                <RiDeleteBin6Line className="text-xl text-[#838894]" />
                            </button>
                        </div>
                    </div>
                    ))}
              <button
                onClick={()=>{ setAddSubSection(section._id)}}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
                </div>
            </details>
        )}

        {confirmationModal ?( <ConfirmationModal
        text1={"Delete this Section?"}
        text2="All the lectures in this section will be deleted"
        btn1Text= "Delete"
        btn2Text= "Cancel"
        btn1Handler= { ()=>{handleDeleleSection(sectionId)}}
        btn2Handler= {()=>{setConfirmationModal(false)}}
        
        />):(<div></div>)}

        {confirmationModal1 && (<ConfirmationModal
                text1={"Delete this Sub-Section?"}
                text2="This lecture will be deleted"
                btn1Text= "Delete"
                btn2Text= "Cancel"
                btn1Handler= { ()=>{handleDeleteSubSection(sectionId,subSectionId)}}
                btn2Handler= {()=>{setConfirmationModal1(false)}}
        />)}
    </div>

      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default NestedView;
