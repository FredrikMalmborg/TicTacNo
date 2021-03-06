import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Background from "./components/background/background";
import PageNavigator from "./pages/page-navigation/PageNavigator";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import AuthProvider from "./contexts/auth/auth-provider";

// To ignore firebase warning temporarily. https://github.com/facebook/react-native/issues/12981
import { LogBox } from "react-native";
import RoomProvider from "./contexts/room/room-provider";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [fontsLoaded] = useFonts({ FredokaOne_400Regular });

  const style: { appContainer: StyleProp<ViewStyle> } = StyleSheet.create({
    appContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
    },
  });

  return (
    <View style={style.appContainer}>
      <Background />
      {fontsLoaded && (
        <>
          <NavigationContainer>
            <AuthProvider>
              <RoomProvider>
                <PageNavigator />
              </RoomProvider>
            </AuthProvider>
          </NavigationContainer>
          <StatusBar style="dark" />
        </>
      )}
    </View>
  );
}
