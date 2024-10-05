import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@/components/common/logo'
import StatusBarDark from '@/components/common/status-bar'
import CustomBotton from '@/components/common/custom-button'
import { router } from 'expo-router'
import { GlobalContextType, useGlobalContext } from '@/context/global-provider'
import OpenScreen from '@/components/common/open-screen'


const Index = () => {
  const {isLoading} = useGlobalContext() as GlobalContextType

  if (isLoading) return <OpenScreen/>

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{ height : "100%" }} className='px-4'>
          <View className='h-full justify-center'>
              <Logo/>
              <View className='flex-row w-full justify-center py-10'>
                <Image style={{ borderWidth : 3, borderColor : "green" }} className='w-[130px] h-[200px] rounded-lg -rotate-6' source={{ uri : "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg" }}/>
                <Image style={{ borderWidth : 3, borderColor : "green" }} className='w-[130px] h-[200px] rounded-lg rotate-6' source={{ uri : "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg" }}/>
              </View>
              <Text style={{ fontFamily : "flux-black" }} className='text-3xl text-center text-primary mb-4'>Share your delicious and healthy recipes!</Text>
              <CustomBotton
                title='Continue'
                handlePress={()=>router.push("/sign-in")}
              />
          </View>
        </ScrollView>
        <StatusBarDark/>
    </SafeAreaView>
  )
}

export default Index