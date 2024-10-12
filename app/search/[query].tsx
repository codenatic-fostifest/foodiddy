import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { primaryColor} from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import SearchInput from '@/components/home/search-input'
import ImageCard from '@/components/home/image-card'
import LogoImage from '@/components/common/logo-image'
import EmptyState from '@/components/common/empty-state'
import useSearchPosts from '@/hooks/useSearchList'

const Search = () => {
    const param : { query : string } = useLocalSearchParams() 

    const {posts, getSearchList, isLoading} = useSearchPosts(param.query)

    useEffect(()=>{
        getSearchList()
    },[param.query])

    return (
        <SafeAreaView className='h-full'>
        {/* {isLoading?<ActivityIndicator className='m-auto' size={"large"} color={primaryColor}/>: */}
            <FlatList
            className='px-4'
            ListHeaderComponent={()=>(
            <View className='mt-4'>
                <View className='flex-row items-center justify-between'>
                <View className='max-w-[75%]'>
                    <Text className='text-lg' style={{ fontFamily : 'flux-black' }}>Search Result</Text>
                    <Text className='text-primary text-2xl' style={{ fontFamily : 'flux-black' }}>{param.query}</Text>
                </View>
                <LogoImage className='w-[70px] h-[50px]'/>
                </View>
                <SearchInput placeholder='Search your favorite dishes...' otherStyles='my-4'/>
            </View>
            )}
            data={posts}
            renderItem={({ item }) => <ImageCard id={item.id} user_id={item.user_id} prep={item.prep} ingr={item.ingr} analysis_id={item.analysis_id} img_url={item.img_url} name={item.name} title={item.title}/>}
            ListEmptyComponent={()=>(
            <EmptyState message='Be the first to upload a food!' size={80}/>
            )}
        />
        {/* } */}
        </SafeAreaView>
    )
}

export default Search