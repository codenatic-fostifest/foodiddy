import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from '@/utils/supabase';
import { GlobalContextType, useGlobalContext } from '@/context/global-provider';
import { usePathname } from 'expo-router';

const LikeButton = ({post_id, totalLikes, hasLiked} : {post_id : string, totalLikes? : number, hasLiked? : boolean}) => {
    const [totalLike, setTotalLike] = useState<number|undefined>(0)
    const [isLike, setLike] = useState(false)

    const { user } = useGlobalContext() as GlobalContextType

    const pathname = usePathname()

    useEffect(()=>{
        setLike(hasLiked)
        setTotalLike(totalLikes)
    },[totalLikes, hasLiked])


    const handlePress = async () => {
            const { data, error } = await supabase
                .from('likes')
                .insert([{ user_id: user?.sub, post_id: post_id }]);
            setLike(true)
            if (error?.code === "23505") {
                const { data, error } = await supabase
                .from('likes')
                .delete()
                .match({ user_id: user?.sub, post_id: post_id });
                setLike(false)
            }
            const { data : dataLike } = await supabase
            .from('likes')
            .select('id', { count: 'exact' })
            .eq('post_id', post_id); 
            setTotalLike(dataLike?.length)
    }
    
  if (pathname.startsWith("/home")) return (
    <View className='flex-row items-center'>
        <Text style={{ fontFamily : "flux-black" }} className='mr-1 text-xl'>{totalLike}</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
            {isLike?<AntDesign name="heart" size={24} color="red" />:<AntDesign name="hearto" size={24} color="black" />}
        </TouchableOpacity>
    </View>
  )
}

export default LikeButton