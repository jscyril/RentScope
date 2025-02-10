import { Stack } from "expo-router";
import { StatusBar } from "react-native"; // Use this for both backgroundColor and style management in React Native
// import { Provider } from "react-redux";
// import { store } from "@/context/store";

export default function RootLayout() {
  return (
    <>
      {/* <Provider store={store}> */}
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(signup)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
      </Stack>
      {/* </Provider> */}
    </>
  );
}
