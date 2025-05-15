"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../theme/theme-provider"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"

interface BlobButtonProps {
  onPress: () => void
  label: string
  color?: string
  textColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const BlobButton: React.FC<BlobButtonProps> = ({
  onPress,
  label,
  color,
  textColor,
  style,
  textStyle,
  disabled = false,
}) => {
  const { colors, personaMode } = useTheme()
  const scale = useSharedValue(1)

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 200, easing: Easing.inOut(Easing.ease) })
  }

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const buttonColor = color || (personaMode === "her" ? colors.herPrimary : colors.himPrimary)

  return (
    <Animated.View style={[animatedStyle, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.button, { backgroundColor: buttonColor, opacity: disabled ? 0.6 : 1 }]}
      >
        <Text style={[styles.label, { color: textColor || colors.seasalt }, textStyle]}>{label.toLowerCase()}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    letterSpacing: 0.5,
  },
})

export default BlobButton
