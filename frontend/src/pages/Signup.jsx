import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <div className="flex flex-col">
    
    <Template
      title="Ready to Begin Your Journey with"
      description1="SkillShiksha"
      description2=""
      image={signupImg}
      formType="signup"
    />
    </div>
  )
}

export default Signup