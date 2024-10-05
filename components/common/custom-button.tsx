import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

interface ButtonType {
    title : string;
    isLoading? : boolean;
    handlePress? : () => void;
    otherStyles? : string;
}

const CustomBotton = ({ title, handlePress, isLoading, otherStyles } : ButtonType) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        className={`rounded-full bg-primary py-3 ${otherStyles}`}
        activeOpacity={0.9}
    >
        {isLoading?<ActivityIndicator size={"large"} color="white"/>:
        <Text style={{ fontFamily : "flux-black" }} className='text-white text-center text-2xl'>
            {title}
        </Text>}
    </TouchableOpacity>
  )
}

export default CustomBotton