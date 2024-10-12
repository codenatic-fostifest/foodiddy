import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { primaryColor } from '@/constants/Colors';
import CustomButton from './custom-button';
import { router } from 'expo-router';

interface EmptyStateType {
    size : number;
    message : string;
}

const EmptyState = ({ size, message } : EmptyStateType) => {
  return (
    <View className='items-center justify-center px-4'>
        <MaterialIcons name='search-off' size={size} color={primaryColor}/>
        <Text className='text-primary text-xl' style={{ fontFamily : 'flux-black' }}>No Foods Found</Text>
        <Text className='text-gray-500' style={{ fontFamily : 'flux-black' }}>{message}</Text>
        <CustomButton title='Add Food' otherStyles='w-full mt-4' handlePress={()=>router.push('/post')}/>
    </View>
  )
}

export default EmptyState