import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {

    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile);

    if(authLoading || profileLoading)
    {
        return(
            <Spinner/>
        )
    }
    

  return (
<div className={`relative flex`}>
    <div className='w-[13rem] mx-auto  relative min-h-screen border-r-2 border-white bg-richblack-800'>
        <Sidebar />
    </div>

    <div className={`text-white w-[calc(100%-13rem)]  `}>
        <Outlet />
    </div>
</div>
  )
}

export default Dashboard