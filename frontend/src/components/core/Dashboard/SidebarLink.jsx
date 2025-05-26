import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link,iconName}) => {

    const location = useLocation();

    const Icon = Icons[iconName];
    
    function matchRoute(route){
        return matchPath({path:route},location.pathname)
    }

  return (
    <NavLink
    to={link.path}
    className={`p-1 rounded-lg relative ${matchRoute(link.path)?"bg-[#02010a] text-yellow-50 border":"bg-opacity-0 text-[#838894]"} hover:bg-[#02010a] hover:text-yellow-50 transition-colors duration-200`}
    >

        {/* <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
            }`}
        ></span> */}

        <div className='flex gap-2 items-center pl-3 pt-3 pb-3'>
            <Icon/>
            {link.name}
        </div>
    </NavLink>
  )
}

export default SidebarLink