import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import { formattedDate } from "../../../utils/dateFormatter"
import { useNavigate } from 'react-router-dom'
import UpdatePassword from './Settings/UpdatePassword'

const MyProfile = () => {

    const {loading,user} = useSelector( (state)=>state.profile)
    const navigate = useNavigate();

    if(loading)
    {
        return <Spinner/>
    }

    const clickHandler=()=>{
        navigate("/dashboard/settings");
    }

  return (
    <div className='text-white mt-6 ml-34 w-8/12 flex flex-col gap-8'>
        <h1 className='text-white font-bold text-2xl mb-11'>My Profile</h1>

        {/* section1 */}
        <div className='flex bg-[#161D29] p-6 rounded-md items-center justify-between border'>
            <div className='flex gap-3 items-center'>
                <img src={user?.image} className='aspect-square rounded-full w-16 object-cover' alt='profile-pic'/>
                <div className='flex flex-col'>
                    <h2 className='uppercase'>{user?.firstName} {user?.lastName}</h2>
                    <p className='text-[#838894]'>{user?.email}</p>
                </div>
            </div>

            <button onClick={clickHandler} className='bg-yellow-300 text-black p-1 px-2 rounded-sm flex items-center gap-2'>
                <span>Edit</span>
                <RiEditBoxLine/>
            </button>
        </div>

        {/* section2 */}
        <div className='flex bg-[#161D29] p-6 rounded-md items-center justify-between border'>
            <div className='flex flex-col gap-3'>
                <h2>About</h2>
                <p className='text-[#838894]'>
                    {
                        user.additionalDetail?.about ?? "Add about yourself"
                    }
                </p>
            </div>

            <button onClick={clickHandler} className='bg-yellow-300 text-black p-1 px-2 rounded-sm flex items-center gap-2'>
                <span>Edit</span>
                <RiEditBoxLine/>
            </button>
        </div>

        {/* section3 */}
        <div className="flex bg-[#161D29] p-11 rounded-md items-center justify-between border">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#424854]">First Name</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Email</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Gender</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#424854]">Last Name</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Phone Number</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#424854]">Date Of Birth</p>
              <p className="text-sm font-medium text-[#F1F2FF]">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
          <button onClick={clickHandler} className='bg-yellow-300 text-black p-1 px-2 rounded-sm flex items-center gap-2'>
                <span>Edit</span>
                <RiEditBoxLine/>
            </button>
        </div>

        {/* Update Password */}
        <UpdatePassword/>
        <div className='mb-7'></div>
    </div>
  )
}

export default MyProfile