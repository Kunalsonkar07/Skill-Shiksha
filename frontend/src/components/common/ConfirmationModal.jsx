import React from 'react'

const ConfirmationModal = ({text1,text2,btn1Text,btn2Text,btn1Handler,btn2Handler}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-[#161D29] p-6 flex flex-col gap-4">
        <h2 className='font-bold text-xl text-white'>{text1}</h2>
        <p className='font-semibold text-[#F1F2FF]0'>{text2}</p>
        <div className='flex justify-between text-xl mt-4'>
            <button onClick={btn1Handler} className='bg-yellow-200 text-black p-1 px-2 rounded-sm 
            flex items-center gap-2
            transition-all duration-200 hover:scale-95
            '>
                {btn1Text}
            </button>
            <button onClick={btn2Handler} className='bg-[#F1F2FF] text-black 
            transition-all duration-200 hover:scale-95
            p-1 px-2 rounded-sm flex items-center gap-2'>
                {btn2Text}
            </button>
        </div>
        </div>
    </div>
  )
}

export default ConfirmationModal