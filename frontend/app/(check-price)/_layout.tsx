import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
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
    </Stack>
  );
}
