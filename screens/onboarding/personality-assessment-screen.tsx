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

type PersonalityAssessmentScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "PersonalityAssessment">
}

interface CommunicationStyle {
  id: string
  title: string
  description: string
  selected: boolean
}

const PersonalityAssessmentScreen: React.FC<PersonalityAssessmentScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const [communicationStyles, setCommunicationStyles] = useState<CommunicationStyle[]>([
    {
      id: "1",
      title: "direct & straightforward",
      description: "you prefer clear, concise communication without sugarcoating",
      selected: false,
    },
    {
      id: "2",
      title: "thoughtful & nuanced",
      description: "you consider multiple perspectives and express yourself with care",
      selected: false,
    },
    {
      id: "3",
      title: "emotional & expressive",
      description: "you communicate with feeling and aren't afraid to be vulnerable",
      selected: false,
    },
    {
      id: "4",
      title: "analytical & logical",
      description: "you approach situations with reason and look for patterns",
      selected: false,
    },
  ])

  const handleStyleSelect = (id: string) => {
    setCommunicationStyles(
      communicationStyles.map((style) => ({
        ...style,
        selected: style.id === id,
      })),
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>your communication style</Text>
        <Text style={[styles.headerSubtitle, { color: colors.raisinBlack }]}>
          soari adapts to how you naturally express yourself
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.question, { color: colors.raisinBlack }]}>
          which communication style feels most like you?
        </Text>

        {communicationStyles.map((style) => (
          <TouchableOpacity key={style.id} onPress={() => handleStyleSelect(style.id)}>
            <BlobContainer
              style={[
                styles.styleOption,
                {
                  borderWidth: style.selected ? 2 : 0,
                  borderColor: style.selected ? colors.powderBlue : "transparent",
                },
              ]}
            >
              <Text style={[styles.styleTitle, { color: colors.raisinBlack }]}>{style.title}</Text>
              <Text style={[styles.styleDescription, { color: colors.raisinBlack }]}>{style.description}</Text>
            </BlobContainer>
          </TouchableOpacity>
        ))}

        <Text style={[styles.note, { color: colors.raisinBlack }]}>
          don't worry, soari will continue to learn and adapt to your unique style over time
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <BlobButton
          label="continue"
          onPress={() => navigation.navigate("RelationshipStatus")}
          style={styles.button}
          disabled={!communicationStyles.some((style) => style.selected)}
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
  },
  question: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 16,
    textAlign: "center",
  },
  styleOption: {
    marginBottom: 16,
  },
  styleTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 8,
  },
  styleDescription: {
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

export default PersonalityAssessmentScreen
