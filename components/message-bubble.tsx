"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../theme/theme-provider"

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp?: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, timestamp }) => {
  const { colors, personaMode } = useTheme()

  const userBubbleColor = personaMode === "her" ? colors.herPrimary : colors.himPrimary
  const otherBubbleColor = colors.neutral

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.otherContainer]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: userBubbleColor }]
            : [styles.otherBubble, { backgroundColor: otherBubbleColor }],
        ]}
      >
        <Text style={[styles.message, { color: isUser ? colors.seasalt : colors.raisinBlack }]}>{message}</Text>
      </View>
      {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  otherContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  message: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    alignSelf: "flex-end",
    fontFamily: "FiraSans-Light",
  },
})

export default MessageBubble
