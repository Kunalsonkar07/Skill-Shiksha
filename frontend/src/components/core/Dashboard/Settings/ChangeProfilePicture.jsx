import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';
import Spinner from '../../../common/Spinner';

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); // Store the actual file
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the actual file
      // console.log('Image Name:', file);
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('displayPicture', selectedFile); // Append the actual file

      // console.log('formdatahello', formData.get('displayPicture')); // Check if the file is appended correctly

      await dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log('ERROR MESSAGE - ', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#161D29] p-6 rounded-md items-center justify-between">
      <div className="flex gap-3 items-center">
        <img
          src={user?.image}
          className="aspect-square w-16 rounded-full object-cover"
          alt="Profile"
        />
        <div className="flex flex-col gap-4">
          <h2>Change Profile Picture</h2>
          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              className={`cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 
                ${loading?"opacity-25":"opacity-100"}
                font-semibold text-[#F1F2FF]0`}
            >
              Select
            </button>
            <button
              className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-black"
              onClick={submitHandler}
            >
              {loading?"Uploading...":"Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
