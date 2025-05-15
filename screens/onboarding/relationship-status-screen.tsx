"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../theme/theme-provider"
import BlobContainer from "../../components/blob-container"
import BlobButton from "../../components/blob-button"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { OnboardingStackParamList } from "../../navigation/navigation-types"
import { TouchableOpacity } from "react-native-gesture-handler"

type RelationshipStatusScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "RelationshipStatus">
}

interface RelationshipStatus {
  id: string
  title: string
  description: string
  selected: boolean
}

const RelationshipStatusScreen: React.FC<RelationshipStatusScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const [relationshipStatuses, setRelationshipStatuses] = useState<RelationshipStatus[]>([
    {
      id: "1",
      title: "situationship",
      description: "undefined connection with romantic or intimate elements",
      selected: false,
    },
    {
      id: "2",
      title: "dating phase",
      description: "actively dating but not yet exclusive or defined",
      selected: false,
    },
    {
      id: "3",
      title: "committed relationship",
      description: "exclusive partnership with defined boundaries",
      selected: false,
    },
    {
      id: "4",
      title: "single & exploring",
      description: "open to connections but not currently involved",
      selected: false,
    },
    {
      id: "5",
      title: "it's complicated",
      description: "unique situation that doesn't fit standard categories",
      selected: false,
    },
  ])

  const handleStatusSelect = (id: string) => {
    setRelationshipStatuses(
      relationshipStatuses.map((status) => ({
        ...status,
        selected: status.id === id,
      })),
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>relationship situation</Text>
        <Text style={[styles.headerSubtitle, { color: colors.raisinBlack }]}>
          soari tailors insights based on your current status
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.question, { color: colors.raisinBlack }]}>
          which best describes your current situation?
        </Text>

        {relationshipStatuses.map((status) => (
          <TouchableOpacity key={status.id} onPress={() => handleStatusSelect(status.id)}>
            <BlobContainer
              style={[
                styles.statusOption,
                {
                  borderWidth: status.selected ? 2 : 0,
                  borderColor: status.selected ? colors.roseQuartz : "transparent",
                },
              ]}
            >
              <Text style={[styles.statusTitle, { color: colors.raisinBlack }]}>{status.title}</Text>
              <Text style={[styles.statusDescription, { color: colors.raisinBlack }]}>{status.description}</Text>
            </BlobContainer>
          </TouchableOpacity>
        ))}

        <Text style={[styles.note, { color: colors.raisinBlack }]}>
          you can always update this later as your situation evolves
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <BlobButton
          label="continue"
          onPress={() => navigation.navigate("FeatureTour")}
          style={styles.button}
          disabled={!relationshipStatuses.some((status) => status.selected)}
        />
      </View>
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
  question: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 16,
    textAlign: "center",
  },
  statusOption: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    opacity: 0.8,
  },
  note: {
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Light",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
  },
  footer: {
    padding: 24,
  },
  button: {
    alignSelf: "center",
  },
})

export default RelationshipStatusScreen
