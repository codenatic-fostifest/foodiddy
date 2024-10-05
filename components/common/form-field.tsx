import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface FormFieldTypes {
    title : string;
    value : string | undefined;
    handleChangeText : (e:string) => void;
    otherStyles? : string | undefined;
    placeholder : string;
}

const FormField = ({title, value, placeholder, handleChangeText, otherStyles} : FormFieldTypes) => {

    return (
    <View className={`my-1 ${otherStyles}`}>
        <Text className='text-lg' style={{ fontFamily : "flux-black" }}>{title}</Text>
        <TextInput
            style={{ fontFamily : "flux-black" }}
            className='px-4 py-3 rounded-md mt-1 text-lg border-2 border-zinc-800 focus:border-primary'
            placeholder={placeholder} 
            value={value}
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password"}
        />
    </View>
    )
}

export default FormField