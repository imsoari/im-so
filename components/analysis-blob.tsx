"use client"

import type React from "react"
import type { ReactNode } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../theme/theme-provider"
import BlobContainer from "./blob-container"

interface AnalysisBlobProps {
  children: ReactNode
  title?: string
  type?: "neutral" | "positive" | "caution" | "alert"
}

const AnalysisBlob: React.FC<AnalysisBlobProps> = ({ children, title = "soari analysis", type = "neutral" }) => {
  const { colors, personaMode } = useTheme()

  const getColor = () => {
    switch (type) {
      case "positive":
        return colors.teaGreen
      case "caution":
        return colors.sunset
      case "alert":
        return colors.alert
      default:
        return personaMode === "her" ? colors.roseQuartz : colors.powderBlue
    }
  }

  return (
    <BlobContainer
      style={styles.container}
      color={`${getColor()}20`} // 20% opacity
    >
      <Text style={[styles.title, { color: getColor() }]}>{title.toLowerCase()}</Text>
      <View style={styles.content}>{children}</View>
    </BlobContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  content: {
    marginTop: 8,
  },
})

export default AnalysisBlob
