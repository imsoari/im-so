"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../theme/theme-provider"

interface TagProps {
  label: string
  color?: string
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  const { colors } = useTheme()

  const tagColor = color || colors.powderBlue

  return (
    <View style={[styles.container, { backgroundColor: `${tagColor}30` }]}>
      <Text style={[styles.label, { color: tagColor }]}>{label.toLowerCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Medium",
    letterSpacing: 0.5,
  },
})

export default Tag
