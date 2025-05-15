"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../theme/theme-provider"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"

const PersonaToggle: React.FC = () => {
  const { persona, setPersona, colors } = useTheme()
  const translateX = useSharedValue(persona === "flow" ? 0 : 100)

  const handleToggle = (newPersona: "flow" | "truth") => {
    setPersona(newPersona)
    translateX.value = withTiming(newPersona === "flow" ? 0 : 100, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  }

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  return (
    <View style={styles.container}>
      <View style={[styles.toggleContainer, { backgroundColor: `${colors.powderBlue}30` }]}>
        <Animated.View style={[styles.slider, { backgroundColor: colors.powderBlue }, sliderStyle]} />
        <View style={styles.labelsContainer}>
          <TouchableOpacity
            style={[styles.labelContainer, { opacity: persona === "flow" ? 1 : 0.7 }]}
            onPress={() => handleToggle("flow")}
          >
            <Text style={[styles.label, { color: persona === "flow" ? colors.seasalt : colors.raisinBlack }]}>
              flow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.labelContainer, { opacity: persona === "truth" ? 1 : 0.7 }]}
            onPress={() => handleToggle("truth")}
          >
            <Text style={[styles.label, { color: persona === "truth" ? colors.seasalt : colors.raisinBlack }]}>
              truth
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  toggleContainer: {
    width: 200,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
  },
  slider: {
    position: "absolute",
    width: 100,
    height: 44,
    borderRadius: 22,
  },
  labelsContainer: {
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  labelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    letterSpacing: 0.5,
  },
})

export default PersonaToggle
