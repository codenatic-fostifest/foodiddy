import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'
import Profile from '@/components/common/profile'
import { router } from 'expo-router'
import { supabase } from '@/utils/supabase'
import ImageCard from '@/components/home/image-card'
import { primaryColor } from '@/constants/Colors'
import usePostsProfile from '@/hooks/usePostProfile'
import EmptyState from '@/components/common/empty-state'

const ProfilePage = () => {
  const { user, setUser } = useGlobalContext() as GlobalContextType

  const [refreshing, setRefreshing] = useState(false)

  const { posts, isLoading, getProfileList} = usePostsProfile(user?.sub)

  const logOut = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) return
    setUser(null)
    router.replace('/sign-in')
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await getProfileList()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='h-full'>
      {isLoading?<ActivityIndicator className='m-auto' size={"large"} color={primaryColor}/>:
        <FlatList
        className='px-4'
        ListHeaderComponent={()=>(
          <View className='mt-6 mb-7'>
            <TouchableOpacity onPress={logOut} className='w-8 self-end' activeOpacity={0.5}>
              <MaterialIcons name='logout' size={30} color={"red"}/>
            </TouchableOpacity>
            <View className='items-center'>
              {user && <Profile style='w-16 h-16'/>}
              <Text className='text-primary my-3 text-2xl text-center' style={{ fontFamily : 'flux-black' }}>{user?.name}</Text>
              <Text className='text-xl text-center' style={{ fontFamily : 'flux-black' }}>{posts?.length}</Text>
              <Text className='text-gray-500 text-center' style={{ fontFamily : 'flux-black' }}>Post</Text>
            </View>
          </View>
        )}
        data={posts}
        renderItem={({ item }) => <ImageCard id={item.id} user_id={item.user_id} prep={item.prep} ingr={item.ingr} analysis_id={item.analysis_id} img_url={item.img_url} name={item.name} title={item.title}/>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={()=>(
          <EmptyState message='You haven&apos;t uploaded any food yet.' size={80}/>
        )}
      />
      }
    </SafeAreaView>
  )
}

export default ProfilePage