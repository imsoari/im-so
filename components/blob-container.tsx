"use client"

import type React from "react"
import type { ReactNode } from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "../theme/theme-provider"
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated"

interface BlobContainerProps {
  children: ReactNode
  style?: ViewStyle
  animated?: boolean
  color?: string
}

const BlobContainer: React.FC<BlobContainerProps> = ({ children, style, animated = false, color }) => {
  const { colors, mode } = useTheme()
  const scale = useSharedValue(1)

  if (animated) {
    scale.value = withRepeat(withTiming(1.05, { duration: 8000, easing: Easing.inOut(Easing.ease) }), -1, true)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const containerStyle = [
    styles.container,
    {
      backgroundColor: color || (mode === "light" ? colors.cardBackground : colors.darkCardBackground),
      shadowColor: mode === "light" ? colors.shadow : colors.darkShadow,
    },
    animated ? animatedStyle : {},
    style,
  ]

  const ContainerComponent = animated ? Animated.View : View

  return <ContainerComponent style={containerStyle}>{children}</ContainerComponent>
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    margin: 10,
  },
})

export default BlobContainer
