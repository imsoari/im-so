"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../theme/theme-provider"
import BlobContainer from "../components/blob-container"
import BlobButton from "../components/blob-button"
import AnalysisBlob from "../components/analysis-blob"
import Tag from "../components/tag"

const DecodeScreen: React.FC = () => {
  const { colors, mode } = useTheme()
  const [messageToAnalyze, setMessageToAnalyze] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)

  const handleAnalyze = () => {
    if (messageToAnalyze.trim() === "") return
    setShowAnalysis(true)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: mode === "light" ? colors.background : colors.darkBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>decode message</Text>
        <Text style={[styles.headerSubtitle, { color: colors.raisinBlack }]}>emotional clarity in 4k ultra hd</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <BlobContainer>
          <Text style={[styles.inputLabel, { color: colors.raisinBlack }]}>paste the message you want to decode</Text>
          <TextInput
            style={[styles.messageInput, { color: colors.raisinBlack, borderColor: `${colors.powderBlue}50` }]}
            placeholder="paste text message here..."
            placeholderTextColor="#999"
            multiline
            value={messageToAnalyze}
            onChangeText={setMessageToAnalyze}
          />
          <BlobButton label="decode this message" onPress={handleAnalyze} style={styles.analyzeButton} />
        </BlobContainer>

        {showAnalysis && (
          <AnalysisBlob title="message decoded">
            <Text style={[styles.analysisText, { color: colors.raisinBlack }]}>
              this message shows <Text style={styles.highlightText}>low investment</Text> and{" "}
              <Text style={styles.highlightText}>vague intentions</Text>.
            </Text>

            <View style={styles.tagsContainer}>
              <Tag label="low interest" color={colors.sunset} />
              <Tag label="non-specific timeframe" color={colors.roseQuartz} />
              <Tag label="keeping options open" color={colors.powderBlue} />
            </View>

            <Text style={[styles.analysisDetail, { color: colors.raisinBlack }]}>
              "hey, sorry I've been busy lately. we should catch up sometime soon" is a classic low-investment text.
              notice:
            </Text>

            <View style={styles.bulletPoints}>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: colors.powderBlue }]} />
                <Text style={[styles.bulletText, { color: colors.raisinBlack }]}>
                  vague timeframe ("sometime soon") without specific plans
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: colors.powderBlue }]} />
                <Text style={[styles.bulletText, { color: colors.raisinBlack }]}>
                  generic excuse ("busy lately") without details
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <View style={[styles.bullet, { backgroundColor: colors.powderBlue }]} />
                <Text style={[styles.bulletText, { color: colors.raisinBlack }]}>
                  "we should" language instead of "i want to"
                </Text>
              </View>
            </View>

            <Text style={[styles.quote, { color: colors.roseQuartz }]}>
              "if they wanted to, they would. vague plans are usually soft passes."
            </Text>
          </AnalysisBlob>
        )}
      </ScrollView>
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
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    textAlign: "center",
    marginTop: 4,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 12,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    fontFamily: "CabinetGrotesk-Light",
    fontSize: 16,
    lineHeight: 24,
  },
  analyzeButton: {
    marginTop: 16,
    alignSelf: "center",
  },
  analysisText: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 24,
    marginBottom: 16,
  },
  highlightText: {
    fontFamily: "CabinetGrotesk-Medium",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  analysisDetail: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 24,
    marginTop: 16,
  },
  bulletPoints: {
    marginTop: 12,
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 22,
  },
  quote: {
    fontFamily: "CabinetGrotesk-Light",
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: "#B3A9C6",
  },
})

export default DecodeScreen
