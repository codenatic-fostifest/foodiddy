import { View, Text, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { AnalysisResultType } from '@/types/analyze'
import { SafeAreaView } from 'react-native-safe-area-context'
import Label from '@/components/post/label'
import CustomBotton from '@/components/common/custom-button'
import { supabase } from '@/utils/supabase'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'

const Result = () => {
    const { user } = useGlobalContext() as GlobalContextType
    const { result } = useLocalSearchParams()
    const foodData : AnalysisResultType = JSON.parse(decodeURIComponent(result));
    const { post, analysResult, category } = foodData
    const { totalNutrients } = analysResult

    const [loading, setLoading] = useState(false)

    const submit = async ()  => {
        setLoading(true)
        try {
            // insert table analysis
            const { data : dataAnalys, error : errorAnalysis } = await supabase
            .from('analysis')
            .insert([
                { health_label : analysResult.healthLabels, diet_label : analysResult.dietLabels }
            ])
            .select()

            if (errorAnalysis) throw new Error(errorAnalysis.message)
            
            // insert table nutrients
            const { data : dataNutrient, error : errorNutrient } = await supabase
            .from('nutrients')
            .insert([
                { analysis_id : dataAnalys[0].id, code : "CHODF", label : totalNutrients.CHOCDF.label, quantity : totalNutrients.CHOCDF.quantity, unit : totalNutrients.CHOCDF.unit  },
                { analysis_id : dataAnalys[0].id, code : "CHOLE", label : totalNutrients.CHOLE.label, quantity : totalNutrients.CHOLE.quantity, unit : totalNutrients.CHOLE.unit  },
                { analysis_id : dataAnalys[0].id, code : "ENERC_KCAL", label : totalNutrients.ENERC_KCAL.label, quantity : totalNutrients.ENERC_KCAL.quantity, unit : totalNutrients.ENERC_KCAL.unit  },
                { analysis_id : dataAnalys[0].id, code : "FAT", label : totalNutrients.FAT.label, quantity : totalNutrients.FAT.quantity, unit : totalNutrients.FAT.unit  },
                { analysis_id : dataAnalys[0].id, code : "NA", label : totalNutrients.NA.label, quantity : totalNutrients.NA.quantity, unit : totalNutrients.NA.unit  },
                { analysis_id : dataAnalys[0].id, code : "PROCNT", label : totalNutrients.PROCNT.label, quantity : totalNutrients.PROCNT.quantity, unit : totalNutrients.PROCNT.unit  },
                { analysis_id : dataAnalys[0].id, code : "SUGAR", label : totalNutrients.SUGAR.label, quantity : totalNutrients.SUGAR.quantity, unit : totalNutrients.SUGAR.unit  },
            ])
            .select()

            if (errorNutrient) throw new Error(errorNutrient.message)

            const response = await fetch(post.img.uri)
            const arrayBuffer = await response.arrayBuffer()
            
            const fileExt = post.img.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
            const path = `${Date.now()}.${fileExt}`
            // upload img > storage
            const { data : dataStorage , error : errorStorage } = await supabase.storage
            .from('image')
            .upload(path, arrayBuffer, {
                contentType: post.img.mimeType ?? 'image/jpeg'
            });
            
            if (errorStorage) throw new Error(errorStorage.message)

            const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dataStorage.fullPath}`
            
            // insert post
            const { data : dataPost, error : errorPost } = await supabase
            .from('posts')
            .insert([
                { name : user?.name, title : post.title, ingr : post.ingr, prep : post.prep, img_url : url, user_id : user?.sub, analysis_id : dataAnalys[0].id, sum : post.sum }
            ])
            .select()
            if (errorPost) throw new Error(errorPost.message)
            Alert.alert('Succes', "You have successfully posted your recipe!")
            router.replace("/home")
        } catch (error : any) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
        
    }
    
    const handleDelete = async () => {
        setLoading(true)
        const getFilePathFromUrl = (url : string) => {
            const parts = url.split('/'); 
            return parts[parts.length - 1];
          };
          
        const filePath = getFilePathFromUrl(post.img.uri);
        try {
            const { data, error : errorStorage } = await supabase.storage
            .from('image') 
            .remove([filePath]);

            const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post.id)
            
            if (error) throw new Error(error.message)
            if (errorStorage) throw new Error(errorStorage.message)
            
            Alert.alert("Seccess", "The post was deleted successfully.")
            router.back()
        } catch (error:any) {
            Alert.alert('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView className='h-full'>
            <FlatList
                className='px-4'
                ListHeaderComponent={()=>(
                    <View>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-3xl text-primary my-4'>Analysis Result</Text>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-3xl'>{post.title}</Text>
                        <Image
                            className='w-full h-[185px] rounded-lg my-2'
                            resizeMode='cover'
                            source={{ uri : post.img.uri }}
                        />
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2 mb-1'>Health Label</Text>
                        <FlatList
                            data={analysResult.healthLabels}
                            renderItem={({ item }) => <Label title={item}/>}
                            horizontal
                        />
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2 mb-1'>Diet Label</Text>
                    </View>
                )}
                data={analysResult.dietLabels}
                renderItem={({ item }) => <Label title={item}/>}
                ListFooterComponent={()=>(
                    <View className='mt-2'>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2  mb-1'>Ingridients</Text>
                        <View className='bg-gray-300 p-2'>
                            <FlatList
                                data={post.ingr}
                                renderItem={({ item, index }) => <Text style={{ fontFamily : 'flux-regular' }} className='text-base'>{`${item}`}</Text>}
                            />
                        </View>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2  mb-1'>Description</Text>
                        <View className='bg-gray-300 p-2'>
                            <Text className='text-base' style={{ fontFamily : 'flux-regular' }}>{post.sum}</Text>
                        </View>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2  mb-1'>Preparations</Text>
                        <View className='bg-gray-300 p-2'>
                            <FlatList
                                data={post.prep}
                                renderItem={({ item, index }) => <Text style={{ fontFamily : 'flux-regular' }} className='text-base'>{`${index+1}. ${item}`}</Text>}
                            />
                        </View>
                        <Text style={{ fontFamily : 'flux-black' }} className='text-xl mt-2  mb-1'>Total Nutrients</Text>
                        <View className='bg-gray-300 p-2 mb-4'>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.ENERC_KCAL.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.ENERC_KCAL.quantity} ${totalNutrients.ENERC_KCAL.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.FAT.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.FAT.quantity} ${totalNutrients.FAT.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.CHOCDF.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.CHOCDF.quantity} ${totalNutrients.CHOCDF.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.SUGAR.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.SUGAR.quantity} ${totalNutrients.SUGAR.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.PROCNT.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.PROCNT.quantity} ${totalNutrients.PROCNT.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.CHOLE.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.CHOLE.quantity} ${totalNutrients.CHOLE.unit}`}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{totalNutrients.NA.label}</Text>
                                <Text className='text-base' style={{ fontFamily : "flux-semibold" }}>{`${totalNutrients.NA.quantity} ${totalNutrients.NA.unit}`}</Text>
                            </View>
                        </View>
                        {category == "insert" && <CustomBotton handlePress={submit} isLoading={loading} otherStyles='mb-4' title='Publish'/>}
                        {category == "delete" && post.user_id == user?.sub && <CustomBotton handlePress={handleDelete} isLoading={loading} otherStyles='mb-4 bg-red-500' title='Delete'/>}
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Result