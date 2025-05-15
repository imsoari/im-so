"use client"

import type React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/theme-provider"
import BlobContainer from "../components/blob-container"
import BlobButton from "../components/blob-button"
import Tag from "../components/tag"

interface SituationshipType {
  id: string
  name: string
  description: string
  color: string
}

const ClarityScreen: React.FC = () => {
  const { colors, mode } = useTheme()

  const situationshipTypes: SituationshipType[] = [
    {
      id: "1",
      name: "almost relationship",
      description: "high connection, missing commitment",
      color: colors.teaGreen,
    },
    {
      id: "2",
      name: "convenience connection",
      description: "inconsistent interest based on availability",
      color: colors.sunset,
    },
    {
      id: "3",
      name: "undefined but progressing",
      description: "growing closer without labels",
      color: colors.powderBlue,
    },
    {
      id: "4",
      name: "mixed signals",
      description: "inconsistent communication creating confusion",
      color: colors.roseQuartz,
    },
  ]

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: mode === "light" ? colors.background : colors.darkBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>situationship clarity</Text>
        <Text style={[styles.headerSubtitle, { color: colors.raisinBlack }]}>
          main character energy for your emotions
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <BlobContainer>
          <Text style={[styles.sectionTitle, { color: colors.raisinBlack }]}>identify your situationship</Text>
          <Text style={[styles.sectionDescription, { color: colors.raisinBlack }]}>
            understanding where you stand is the first step to emotional clarity
          </Text>

          <BlobButton label="take the assessment" onPress={() => {}} style={styles.assessmentButton} />
        </BlobContainer>

        <Text style={[styles.listTitle, { color: colors.raisinBlack }]}>situationship types</Text>

        {situationshipTypes.map((type) => (
          <BlobContainer key={type.id} style={styles.typeContainer}>
            <View style={styles.typeHeader}>
              <Text style={[styles.typeName, { color: type.color }]}>{type.name}</Text>
              <Tag label={type.description} color={type.color} />
            </View>

            <TouchableOpacity style={[styles.learnMoreButton, { borderColor: type.color }]} onPress={() => {}}>
              <Text style={[styles.learnMoreText, { color: type.color }]}>learn more</Text>
              <Feather name="chevron-right" size={16} color={type.color} />
            </TouchableOpacity>
          </BlobContainer>
        ))}

        <BlobContainer style={styles.timelineContainer}>
          <Text style={[styles.timelineTitle, { color: colors.raisinBlack }]}>relationship timeline</Text>
          <Text style={[styles.timelineDescription, { color: colors.raisinBlack }]}>
            track the progression of your connection with interactive visualization
          </Text>

          <View style={styles.timelinePlaceholder}>
            <View style={[styles.timelinePoint, { backgroundColor: colors.teaGreen }]}>
              <Text style={styles.timelineDate}>May 10</Text>
            </View>
            <View style={[styles.timelineLine, { backgroundColor: colors.powderBlue }]} />
            <View style={[styles.timelinePoint, { backgroundColor: colors.powderBlue }]}>
              <Text style={styles.timelineDate}>May 7</Text>
            </View>
            <View style={[styles.timelineLine, { backgroundColor: colors.powderBlue }]} />
            <View style={[styles.timelinePoint, { backgroundColor: colors.sunset }]}>
              <Text style={styles.timelineDate}>May 3</Text>
            </View>
          </View>

          <BlobButton label="view full timeline" onPress={() => {}} style={styles.timelineButton} />
        </BlobContainer>
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
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.8,
  },
  assessmentButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  listTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 16,
  },
  typeContainer: {
    marginBottom: 12,
  },
  typeHeader: {
    marginBottom: 12,
  },
  typeName: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 8,
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  learnMoreText: {
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Medium",
    marginRight: 4,
  },
  timelineContainer: {
    marginTop: 12,
  },
  timelineTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.8,
  },
  timelinePlaceholder: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 16,
  },
  timelinePoint: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineDate: {
    color: "white",
    fontSize: 12,
    fontFamily: "FiraSans-Medium",
  },
  timelineLine: {
    width: 60,
    height: 3,
  },
  timelineButton: {
    marginTop: 8,
    alignSelf: "center",
  },
})

export default ClarityScreen
