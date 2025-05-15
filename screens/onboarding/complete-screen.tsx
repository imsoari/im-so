"use client"

import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../theme/theme-provider"
import BlobButton from "../../components/blob-button"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import React from "react"

type CompleteScreenProps = {
  navigation: NativeStackNavigationProp<any>
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const scale = useSharedValue(0.8)
  const opacity = useSharedValue(0)

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 12 })
    opacity.value = withSpring(1, { damping: 20 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  const handleGetStarted = () => {
    // Navigate to the main app
    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }],
    })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Image source={{ uri: "/placeholder-6ixiq.png" }} style={styles.image} />

        <Text style={[styles.title, { color: colors.raisinBlack }]}>you're all set!</Text>

        <Text style={[styles.description, { color: colors.raisinBlack }]}>
          soari is ready to help you navigate your relationships with emotional clarity and confidence.
        </Text>

        <View style={styles.quoteContainer}>
          <Text style={[styles.quote, { color: colors.roseQuartz }]}>
            "just because you care doesn't mean you owe access. your peace matters too."
          </Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <BlobButton label="start using soari" onPress={handleGetStarted} style={styles.button} />
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "CabinetGrotesk-Medium",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Light",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 32,
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

export default CompleteScreen
