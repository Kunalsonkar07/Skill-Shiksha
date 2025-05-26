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
<div className={`relative flex h-full`}>
    {/* <div className='w-[13rem] mx-auto  relative min-h-screen border-r-2 border-white bg-[#161D29] p-10'> */}
        <Sidebar />
    {/* </div> */}

    <div className={`text-white w-full p-10 min-h-screen`}>
        <Outlet />
    </div>
</div>
  )
}

export default Dashboard