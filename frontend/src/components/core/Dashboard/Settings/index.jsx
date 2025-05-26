import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
      <div className='text-white mt-6 ml-44 w-8/12 flex flex-col gap-8'>
      <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
          Edit Profile
          <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
      </div>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
      </div>
    </>
  )
}