import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './logo'

const OpenScreen = () => {
  return (
    <SafeAreaView className='h-full justify-center items-center'>
        <Logo/>
    </SafeAreaView>
  )
}

export default OpenScreen