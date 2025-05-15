"use client"

import type React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type { OnboardingStackParamList } from "./navigation-types"

// Screens
import WelcomeScreen from "../screens/onboarding/welcome-screen"
import PersonalityAssessmentScreen from "../screens/onboarding/personality-assessment-screen"
import RelationshipStatusScreen from "../screens/onboarding/relationship-status-screen"
import FeatureTourScreen from "../screens/onboarding/feature-tour-screen"
import PersonalizationScreen from "../screens/onboarding/personalization-screen"
import CompleteScreen from "../screens/onboarding/complete-screen"

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PersonalityAssessment" component={PersonalityAssessmentScreen} />
      <Stack.Screen name="RelationshipStatus" component={RelationshipStatusScreen} />
      <Stack.Screen name="FeatureTour" component={FeatureTourScreen} />
      <Stack.Screen name="Personalization" component={PersonalizationScreen} />
      <Stack.Screen name="Complete" component={CompleteScreen} />
    </Stack.Navigator>
  )
}

export default OnboardingNavigator
