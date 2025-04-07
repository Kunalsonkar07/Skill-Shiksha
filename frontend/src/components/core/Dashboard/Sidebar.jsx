import React,{ useState,useEffect} from 'react'
import { VscSignOut } from "react-icons/vsc"
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';
import Spinner from '../../common/Spinner';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import { logout } from '../../../services/operations/authAPI';
// import { setLook } from '../../../slices/authSlice';

const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      )
      const [confirmationModal, setConfirmationModal] = useState(false);
      const { loading: authLoading } = useSelector((state) => state.auth)


      // useEffect( ()=>{
      //   console.log("Before",look)
      //   dispatch(setLook(confirmationModal))
      //   console.log("After",look)
      // },[confirmationModal])

      const dispatch = useDispatch()
      const navigate = useNavigate()
      // to keep track of confirmation modal
    
      if (profileLoading || authLoading) {
        return (
          <Spinner/>
        )
      }
    
      function CancelHandler()
      {
        setConfirmationModal(false) 
      }



  return (
    <>
    <div className={`flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10`}>
        <div className="flex flex-col gap-4">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col gap-3">
            <SidebarLink link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"/>

            <button onClick={ ()=> setConfirmationModal(true)}>
                <div className='flex pl-3 items-center gap-2 text-richblack-5'>
                    <VscSignOut/>
                    <span >Logout</span>
                </div>
            </button>
        </div>
    </div>

        <div className='absolute top-[25%] left-[250%]'>  

        {
            confirmationModal && (<ConfirmationModal text1= "Are you sure?"
                text2= "You will be logged out of your account."
                btn1Text= "Logout"
                btn2Text= "Cancel"
                btn1Handler= { ()=>{dispatch(logout(navigate))}}
                btn2Handler={()=>{
                  CancelHandler()
                }}
            />)
        }
        </div>
    </>
  )
}

export default Sidebar

// Are you Sure?
// You will logout from your account
// Logout cancel