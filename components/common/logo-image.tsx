import { Image } from "react-native"

const LogoImage = ({className = "w-[85px] h-[60px]"} : { className? : string }) => {
  return (
    <Image className={`${className} bg-cover`} source={require("@/assets/images/logo-foodiddy.png")}/>
  )
}

export default LogoImage