import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Profile from '../common/profile'
import { supabase } from '@/utils/supabase'
import { router } from 'expo-router'
import LikeButton from '../common/like'


const ImageCard = ({img_url, id, user_id, title, name, analysis_id, ingr, prep, sum, totalLikes, hasLiked} : {totalLikes? : number, hasLiked? : boolean, id : string, img_url : string, title : string, name : string, analysis_id : string, ingr : string[], prep : string[], user_id : string, sum : string }) => {
    const handlePress = async () => {
        const { data : dataAnalysis, error : errorAnalys } = await supabase
            .from('analysis')
            .select('*')
            .eq('id', analysis_id)
            .single()
        const { data : dataNutrient, error : errorNutrient } = await supabase
            .from('nutrients')
            .select('*')
            .eq('analysis_id', dataAnalysis.id)
        if (errorNutrient||errorAnalys) return
        const foodData = {
            category : "delete",
            post : {
                id : id,
                title : title,
                ingr: ingr,
                prep: prep,
                img : {
                    uri : img_url
                },
                user_id : user_id,
                sum : sum
            },
            analysResult : {
              dietLabels : dataAnalysis.diet_label,
              healthLabels : dataAnalysis.health_label,
              totalNutrients : {
                CHOCDF : dataNutrient[0],
                CHOLE : dataNutrient[1],
                ENERC_KCAL : dataNutrient[2],
                FAT : dataNutrient[3],
                SUGAR : dataNutrient[4],
                PROCNT : dataNutrient[5],
                NA : dataNutrient[6],
              }
            }
          }
          const foodDataString = encodeURIComponent(JSON.stringify(foodData));
          router.push(`/result/${foodDataString}`)
        }
    return (
        <>
            <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
                <View>
                    <View className='flex-row items-center justify-between'>
                        <View className='flex-row items-center'>
                            <Profile style='w-12'/>
                            <View className='ml-2 max-w-[74%]'>
                                <Text numberOfLines={1} ellipsizeMode='tail' className='text-black text-sm' style={{ fontFamily : "flux-black" }}>{name}</Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        className='w-full h-[185px] rounded-lg my-2'
                        resizeMode='cover'
                        source={{ uri : img_url }}
                    />
                </View>
            </TouchableOpacity>
            <View className='flex-row justify-between items-center'>
                <View className='w-[78%]'>
                    <Text numberOfLines={1} ellipsizeMode='tail' className='text-primary text-xl ml-2' style={{ fontFamily : "flux-black" }}>{title}</Text>
                </View>
                <View className='flex-row items-center'>                   
                    <LikeButton hasLiked={hasLiked} totalLikes={totalLikes} post_id={id}/>
                </View>
            </View>
            <Text className='ml-2 mb-10' style={{ fontFamily : "flux-regular" }}>{sum}</Text>
        </>
    )
}

export default ImageCard