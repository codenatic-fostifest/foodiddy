import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AnalysisResultType } from '@/types/analyze'
import { SafeAreaView } from 'react-native-safe-area-context'
import Label from '@/components/post/label'
import CustomBotton from '@/components/common/custom-button'

const Result = () => {
    const { result } = useLocalSearchParams()
    const foodData : AnalysisResultType = JSON.parse(decodeURIComponent(result));
    const { post, analysResult } = foodData
    const { totalNutrients } = analysResult
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
                        <CustomBotton otherStyles='mb-4' title='Publish'/>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Result