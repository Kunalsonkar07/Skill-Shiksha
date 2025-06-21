import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="text-[#F1F2FF]0 mt-6 ml-4 w-11/12 flex flex-col gap-8">
      <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
        Cart
        <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
      </div>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-[#6E727F]">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-[#AFB2BF] w-full">
          Your cart is empty
        </p>
      )}
    </div>
  )
}