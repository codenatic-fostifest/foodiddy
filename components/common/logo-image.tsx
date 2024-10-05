import { Image, ImageProps } from "react-native"


const LogoImage = ({...props}: ImageProps) => {
  return (
    <Image source={require("@/assets/images/logo-foodiddy.png")} {...props}/>
  )
}

export default LogoImage