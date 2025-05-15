"use client"

import type React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../theme/theme-provider"
import BlobButton from "../../components/blob-button"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { OnboardingStackParamList } from "../../navigation/navigation-types"

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "Welcome">
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: "/placeholder-tis3n.png" }} style={styles.logo} />
          <Text style={[styles.appName, { color: colors.raisinBlack }]}>soari</Text>
        </View>

        <Text style={[styles.tagline, { color: colors.raisinBlack }]}>the cheat code to clarity</Text>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: colors.raisinBlack }]}>
            welcome to soari, your emotional intelligence platform for navigating modern relationships, situationships,
            and all the complicated feelings in between.
          </Text>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={[styles.quote, { color: colors.roseQuartz }]}>
            "we believe you can care deeply and still move wisely."
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <BlobButton
          label="let's get started"
          onPress={() => navigation.navigate("PersonalityAssessment")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appName: {
    fontSize: 48,
    fontFamily: "CabinetGrotesk-Medium",
  },
  tagline: {
    fontSize: 20,
    fontFamily: "CabinetGrotesk-Light",
    textAlign: "center",
    marginBottom: 40,
  },
  descriptionContainer: {
    marginBottom: 40,
  },
  description: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Light",
    textAlign: "center",
    lineHeight: 26,
  },
  quoteContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderLeftWidth: 2,
    borderLeftColor: "#B3A9C6",
  },
  quote: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    fontStyle: "italic",
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  button: {
    alignSelf: "center",
  },
})

export default WelcomeScreen
