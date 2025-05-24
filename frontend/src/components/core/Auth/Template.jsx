// import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Spinner from "../../common/Spinner"
import AuthImagePattern from "../../common/AuthImagePattern"
import { WavyBackgroundDemo } from "../../aceternity/WavyBackgroundDemo"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="flex flex-col">
      
    <WavyBackgroundDemo/>
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <Spinner/>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.7rem] font-semibold leading-[2.375rem] text-[#F1F2FF]">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">

            <span className={`${
              formType === "signup" 
                ? "text-[1.875rem] font-semibold leading-[2.375rem] flex justify-center text-orange-500" 
                : "text-[#AFB2BF]"
            }`}>
              {description1}
            </span>

              <span className="font-edu-sa text-orange-500 font-bold italic">
                  {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
          <AuthImagePattern
            title={"Welcome back!"}
            subtitle={"SkillShiksha is an innovative learning platform that offers a seamless and engaging experience for learners"}
          />
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Template