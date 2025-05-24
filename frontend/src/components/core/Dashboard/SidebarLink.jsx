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
    className={`relative ${matchRoute(link.path)?"bg-yellow-800 text-yellow-50":"bg-opacity-0 text-[#838894]"}`}
    >

        <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
            }`}
        ></span>

        <div className='flex gap-2 items-center pl-3 pt-3 pb-3'>
            <Icon/>
            {link.name}
        </div>
    </NavLink>
  )
}

export default SidebarLink