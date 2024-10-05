import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Logo from '@/components/common/logo'
import FormField from '@/components/common/form-field'
import CustomButton from '@/components/common/custom-button'
import { Link, router } from 'expo-router'
// import { getCurrentUser, signIn } from '@/services/users'
// import { GlobalContextType, useGlobalContext } from '@/context/global-provider'

const SignIn = () => {
    // const { setLoggedIn, setUser } = useGlobalContext() as GlobalContextType

    const [form, setForm] = useState({
        email : "",
        password : ""
    })

    const [isSubmitting, setSubmitting] = useState(false)

    // const submit = async () => {
    //     if (!form.email || !form.password) {
    //         Alert.alert('Error', 'Please fill in all the fields')
    //     }

    //     setSubmitting(true)

    //     try {
    //         await signIn(form.email, form.password)
    //         const result = await getCurrentUser()
    //         setUser(result)
    //         setLoggedIn(true)
    //         router.replace('/home')
    //     } catch (error:any) {
    //         Alert.alert('Error', error.message)
    //     } finally {
    //         setSubmitting(false)
    //     }
    // }

    return (
        <SafeAreaView className='h-full'>
            <ScrollView>
                <View className='min-h-[90vh] px-4 my-6 justify-center'>
                    <Logo/>
                    <View>
                        <FormField 
                            title="Email"
                            value={form.email}
                            placeholder='Enter Your Email'
                            handleChangeText={(e : string) => setForm({...form, email : e})} 
                        />
                        <FormField 
                            title="Password"
                            value={form.password}
                            placeholder='Enter Your Password'
                            handleChangeText={(e : string) => setForm({...form, password : e})}  
                        />
                        <CustomButton
                            title='Sign In'
                            // handlePress={submit}
                            isLoading={isSubmitting}
                            otherStyles='my-6'
                        />
                    </View>
                    <Text className='text-center' style={{ fontFamily : "flux-regular" }}>Don&apos;t have account? <Link className='text-primary' style={{ fontFamily : "flux-black" }} href="/sign-up">Sign Up</Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

export default SignIn