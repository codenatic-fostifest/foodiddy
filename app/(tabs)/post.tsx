import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/common/form-field'
import FileField from '@/components/post/file-field'
import { getDocumentAsync } from 'expo-document-picker'
import CustomButton from '@/components/common/custom-button'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'
import { PostFormType } from '@/types/post'
import axios from 'axios'
import { AnalyzedType } from '@/types/analyze'
import { router } from 'expo-router'



const Post = () => {
  const { user } = useGlobalContext() as GlobalContextType
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<PostFormType>({
    title : '',
    img : null,
    ingr : "",
    prep : "",
    sum : ""
  })

  const openPicker = async () => {
    const result = await getDocumentAsync({
      type : ["image/jpg", "image/jpeg"]
    })
    if (!result.canceled) {
      setForm({...form, img : result.assets[0]})
    }
  }

  const submit = async () => {
    if (!form.ingr || !form.prep || !form.title || !form.img || !form.sum) {
        Alert.alert('Error', 'Please fill in all the fields')
        return
    }

    const ingredientsArray = form.ingr.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);
    const preparationsArray = form.prep.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);

    const updatedForm = {
      title : form.title,
      ingr: ingredientsArray,
      prep: preparationsArray,
    };


    setUploading(true)

    try {
      const response = await axios.post<AnalyzedType>(
        'https://api.edamam.com/api/nutrition-details',
        updatedForm,
        {
          params : {
            app_id : "5150fe85",
            app_key : "bfe8574843f1e6ea6498ef13f65de871"
          }
        }
      )
      const data = response.data
      const foodData = {
        category : "insert",
        post : {
          ...form,
          ingr: ingredientsArray,
          prep: preparationsArray,
        },
        analysResult : {
          dietLabels : data.dietLabels,
          cautions : data.cautions,
          healthLabels : data.healthLabels,
          totalNutrients : {
            CHOCDF : data.totalNutrients.CHOCDF,
            CHOLE : data.totalNutrients.CHOLE,
            ENERC_KCAL : data.totalNutrients.ENERC_KCAL,
            FAT : data.totalNutrients.FAT,
            SUGAR : data.totalNutrients.SUGAR,
            PROCNT : data.totalNutrients.PROCNT,
            NA : data.totalNutrients.NA,
          }
        }
      }
      setForm({
        title : '',
        img : null,
        ingr : "",
        prep : "",
        sum : ""
      })
      const foodDataString = encodeURIComponent(JSON.stringify(foodData));
      router.push(`/result/${foodDataString}`)
    } catch (error:any) {
      if (error.response.data.error === "low_quality") {
        Alert.alert('Error', "Low quality input. Please clarify.")
      } else {
        Alert.alert('Error', error.message)
      }
    } finally {
        setUploading(false)
    }
  }

  return (
    <SafeAreaView className='h-full'>
      <ScrollView className='px-4'>
        <Text className='text-primary text-2xl mt-5' style={{ fontFamily : 'flux-black' }}>Evaluate Your Recipe</Text>
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
            asset={form.img}
          />
          <FormField
            title='Description'
            placeholder='Write your recipe description here...'
            handleChangeText={(e : string) => setForm({...form, sum : e})}
            value={form.sum}
            multiline
            numberOfLines={4}
            style={{ textAlignVertical : "top" }}
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
          <CustomButton handlePress={submit} title='Analysis' otherStyles='mt-2 mb-4' isLoading={uploading}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Post