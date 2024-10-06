import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/common/form-field'
import FileField from '@/components/post/file-field'
import { getDocumentAsync } from 'expo-document-picker'
import CustomButton from '@/components/common/custom-button'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'
import { PostFormType } from '@/types/post'



const Post = () => {
  const { user } = useGlobalContext() as GlobalContextType
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState<PostFormType>({
    title : '',
    image : null,
    ingr : "",
    prep : "",
    userId : undefined
  })

  const openPicker = async () => {
    const result = await getDocumentAsync({
      type : ["image/jpg", "image/jpeg", "image/png"]
    })
    if (!result.canceled) {
      setForm({...form, image : result.assets[0]})
    }
  }

  const submit = async () => {
    if (!form.ingr || !form.prep || !form.title || !form.image) {
        Alert.alert('Error', 'Please fill in all the fields')
    }

    const ingredientsArray = form.ingr.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);
    const preparationsArray = form.prep.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);

    const updatedForm = {
      ...form,
      ingr: ingredientsArray,
      prep: preparationsArray,
    };


    setUploading(true)

    try {
      console.log(updatedForm)
        // const result = await createVideo({...form, userId : user?.$id})
        // setForm({
        //   title : '',
        //   video : null,
        //   thumbnail : null,
        //   prompt : '',
        //   userId : undefined
        // })
        // if (result) {
        //   Alert.alert('Succes', 'Video has been published')
        // }
    } catch (error:any) {
        Alert.alert('Error', error.message)
    } finally {
        setUploading(false)
    }
  }

  return (
    <SafeAreaView className='h-full'>
      <ScrollView className='px-4'>
        <Text className='text-primary text-2xl mt-5' style={{ fontFamily : 'flux-black' }}>Upload Your Recipes</Text>
        <View className='mt-2'>
          <FormField
            title='Title'
            placeholder='Enter a catchy title for your recipe...'
            handleChangeText={(e : string) => setForm({...form, title : e})}
            value={form.title}
          />
          <FileField 
            title='Image'
            handleChangeFile={openPicker}
            asset={form.image}
          />
          <FormField
            title='Ingredients'
            placeholder='List your ingredients. example : 1 gr salt, 2 whole egg'
            handleChangeText={(e : string) => setForm({...form, ingr : e})}
            value={form.ingr}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical : "top" }}
          />
          <FormField
            title='Preparations'
            placeholder='Describe the preparation steps. example : Preheat oven to 350°F, Bake for 30 minutes'
            handleChangeText={(e : string) => setForm({...form, prep : e})}
            value={form.prep}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical : "top" }}
          />
          <CustomButton handlePress={submit} title='Analyze' otherTextStyle='text-primary' otherStyles='mb-2 mt-4 bg-transparent border-[2.5px] border-primary' isLoading={uploading}/>
          <CustomButton handlePress={submit} title='Publish' otherStyles='mt-2 mb-4' isLoading={uploading}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Post