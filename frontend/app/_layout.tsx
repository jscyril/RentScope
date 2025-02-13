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
        <Stack.Screen
          name="check-price"
          options={{
            headerTitle: "Check Price",
            headerStyle: { backgroundColor: "#EAE2FA" },
            headerTitleStyle: {
              color: "#000",
              fontSize: 18,
              fontWeight: "600",
            },
            headerTintColor: "#000",
          }}
        />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
      </Stack>
      {/* </Provider> */}
    </>
  );
}
