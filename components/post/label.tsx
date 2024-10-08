import { View, Text } from 'react-native'
import React from 'react'

const Label = ({ title } : { title : string }) => {
  return (
    <View className='py-1 px-4 rounded-full my-1 mx-[3px] bg-primary'>
      <Text className='text-white text-lg text-center' style={{ fontFamily : 'flux-black' }}>{title.replace(/_/g, ' ').toLowerCase()}</Text>
    </View>
  )
}

export default Label