import React from 'react'
import { Stack } from 'expo-router'
import StatusBarDark from '@/components/common/status-bar'

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen
                name='sign-in'
                options={{
                    headerShown : false
                }}
            />
            <Stack.Screen
                name='sign-up'
                options={{
                    headerShown : false
                }}
            />
        </Stack>
        <StatusBarDark/>
    </>
  )
}

export default AuthLayout