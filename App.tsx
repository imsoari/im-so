"use client"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Screens
import ChatScreen from "./screens/chat-screen"
import DecodeScreen from "./screens/decode-screen"
import ClarityScreen from "./screens/clarity-screen"
import ProfileScreen from "./screens/profile-screen"

// Onboarding
import OnboardingNavigator from "./navigation/onboarding-navigator"

// Theme
import { ThemeProvider } from "./theme/theme-provider"
import { colors } from "./theme/colors"

// Types
import type { RootStackParamList } from "./navigation/navigation-types"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator<RootStackParamList>()

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Chat") {
            iconName = "message-circle"
          } else if (route.name === "Decode") {
            iconName = "search"
          } else if (route.name === "Clarity") {
            iconName = "compass"
          } else if (route.name === "Profile") {
            iconName = "user"
          }

          return <Feather name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: colors.powderBlue,
        tabBarInactiveTintColor: colors.raisinBlack,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.seasalt,
          position: "absolute",
          height: 60,
          paddingBottom: 8,
          shadowColor: colors.raisinBlack,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "CabinetGrotesk-Medium",
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Decode" component={DecodeScreen} />
      <Tab.Screen name="Clarity" component={ClarityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user has completed onboarding
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("hasCompletedOnboarding")
        setHasCompletedOnboarding(value === "true")
      } catch (error) {
        console.error("Error checking onboarding status:", error)
        setHasCompletedOnboarding(false)
      }
    }

    checkOnboardingStatus()
  }, [])

  // Show loading state while checking onboarding status
  if (hasCompletedOnboarding === null) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" backgroundColor={colors.seasalt} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!hasCompletedOnboarding ? (
              <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            ) : (
              <Stack.Screen name="MainApp" component={MainApp} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
