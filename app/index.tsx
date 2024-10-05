import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@/components/common/logo'

const SignGoogle = () => {
  return (
    <SafeAreaView>
        <View className='px-4'>
            <Logo otherSyle='mt-10'/>
        </View>
    </SafeAreaView>
  )
}

export default SignGoogle