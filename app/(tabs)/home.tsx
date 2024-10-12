import LogoImage from '@/components/common/logo-image'
import ImageCard from '@/components/home/image-card'
import SearchInput from '@/components/home/search-input'
import { primaryColor } from '@/constants/Colors'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'
import usePosts from '@/hooks/usePostHome'
import { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user } = useGlobalContext() as GlobalContextType
  
  const [refreshing, setRefreshing] = useState(false)
  
  const {posts, isLoading, getHomeList} = usePosts()

  const onRefresh = async () => {
    setRefreshing(true)
    await getHomeList()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='h-full'>
      {isLoading?<ActivityIndicator className='m-auto' size={"large"} color={primaryColor}/>:
      <FlatList
        className='px-4'
        ListHeaderComponent={()=>(
          <View className='mt-4'>
            <View className='flex-row items-center justify-between'>
              <View className='max-w-[75%]'>
                <Text className='text-black text-lg' style={{ fontFamily : 'flux-black' }}>Welcome Back</Text>
                <Text className='text-primary text-2xl' style={{ fontFamily : 'flux-black' }}>{user?.name}</Text>
              </View>
              <LogoImage className='w-[70px] h-[50px]'/>
            </View>
            <SearchInput placeholder='Search your favorite dishes...' otherStyles='my-4'/>
          </View>
        )}
        data={posts}
        renderItem={({ item }) => <ImageCard id={item.id} user_id={item.user_id} prep={item.prep} ingr={item.ingr} analysis_id={item.analysis_id} img_url={item.img_url} name={item.name} title={item.title}/>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      }
    </SafeAreaView>
  )
}

export default Home