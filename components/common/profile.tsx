import { View, Text, Image } from 'react-native'
import React from 'react'

interface ProfileType {
    style? : string
}

const Profile = ({ style } : ProfileType) => {
  return (
    <Image
        style={{ borderWidth : 3, borderColor : "green" }}
        className={`${style} aspect-square rounded-full`}
        source={require("@/assets/images/profile.png")}
    />
  )
}

export default Profile