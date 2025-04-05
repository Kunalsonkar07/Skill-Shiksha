import loginImg from "../assets/Images/login.webp"
import { LampDemo } from "../components/aceternity/LampDemo"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <div className="flex flex-col">
    
    <Template
      title="Welcome Back"
      description1="Secure Access Made Simple. "
      description2="Pick your preferred login method.."
      image={loginImg}
      formType="login"
    />
    </div>
  )
}

export default Login