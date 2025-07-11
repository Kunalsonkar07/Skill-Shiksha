import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
      <div className='text-white mt-6 ml-10 w-8/12 flex flex-col gap-8'>

      <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
          Add Course
          <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
      </div>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-[#161D29] p-6 xl:block">
          <p className="mb-8 text-lg text-[#F1F2FF]">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-[#F1F2FF]">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}