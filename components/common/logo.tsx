import { View } from 'react-native'
import React from 'react'
import LogoImage from './logo-image'
import LogoText from './logo-text'

const Logo = ({ otherSyle } : { otherSyle? : string }) => {
  return (
    <View className={`mx-auto items-center ${otherSyle}`}>
        <LogoImage/>
        <LogoText/>
    </View>
  )
}

export default Logo