import GlobalProvider from '@/context/global-provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "flux-black": require('../assets/fonts/AfacadFlux-Black.ttf'),
    "flux-regular": require('../assets/fonts/AfacadFlux-Regular.ttf'),
    "flux-semibold": require('../assets/fonts/AfacadFlux-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="result/[result]" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{headerShown : false}}/>
      </Stack>
    </GlobalProvider>
  );
}
