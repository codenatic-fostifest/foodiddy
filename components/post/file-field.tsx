import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { DocumentPickerAsset } from 'expo-document-picker';

interface FormFieldTypes {
    title : string;
    handleChangeFile : () => void;
    asset : DocumentPickerAsset | null;
}

const FileField = ({title, handleChangeFile, asset} : FormFieldTypes) => {

    return (
    <View className={`my-1`}>
        <Text className='text-lg' style={{ fontFamily : "flux-black" }}>{title}</Text>
        {
            asset ? 
            <Image
                className='w-full h-[185px] rounded-lg my-2'
                resizeMode='cover'
                source={{ uri : asset.uri }}
            /> : null
        }
        <TouchableOpacity onPress={handleChangeFile} className='bg-primary flex-row gap-x-1 justify-center items-center py-3 rounded-lg w-full mx-auto mt-1' activeOpacity={0.9}>
            <MaterialIcons name='upload-file' className='bg-white' size={28} color={"white"}/>
            <Text className='text-white' style={{ fontFamily : 'flux-black' }}>Choose a file</Text>
        </TouchableOpacity>
    </View>
    )
}

export default FileField