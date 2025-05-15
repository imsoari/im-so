"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/theme-provider"
import BlobContainer from "../components/blob-container"
import MessageBubble from "../components/message-bubble"
import PersonaToggle from "../components/persona-toggle"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

const ChatScreen: React.FC = () => {
  const { colors, mode, persona } = useTheme()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "hey there. what's on your mind today?",
      isUser: false,
      timestamp: "9:30 AM",
    },
  ])
  const scrollViewRef = useRef<ScrollView>(null)

  const handleSend = () => {
    if (input.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      let responseText = ""

      if (persona === "flow") {
        responseText =
          "i'm sensing some uncertainty in your words... like you're trying to find solid ground in shifting sands. what parts of this situation feel most confusing to you right now?"
      } else {
        responseText =
          "let's be real - you're overthinking this. they're either in or they're out, and all this analyzing is just keeping you stuck. what do you actually want here?"
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse])

      // Scroll to bottom
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    }, 1500)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: mode === "light" ? colors.background : colors.darkBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>chat with soari</Text>
        <PersonaToggle />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </ScrollView>

        <BlobContainer style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { color: colors.raisinBlack }]}
              placeholder="type your message..."
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.powderBlue }]} onPress={handleSend}>
              <Feather name="send" size={20} color={colors.seasalt} />
            </TouchableOpacity>
          </View>
        </BlobContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "CabinetGrotesk-Medium",
    textAlign: "center",
    marginBottom: 8,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  inputContainer: {
    margin: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: "CabinetGrotesk-Light",
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
})

export default ChatScreen
