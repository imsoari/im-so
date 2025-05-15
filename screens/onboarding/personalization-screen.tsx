"use client"

import type React from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../theme/theme-provider"
import BlobContainer from "../../components/blob-container"
import BlobButton from "../../components/blob-button"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { OnboardingStackParamList } from "../../navigation/navigation-types"

type PersonalizationScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "Personalization">
}

const PersonalizationScreen: React.FC<PersonalizationScreenProps> = ({ navigation }) => {
  const { colors, mode, toggleMode, personaMode, setPersonaMode } = useTheme()

  const handlePersonaModeChange = () => {
    setPersonaMode(personaMode === "her" ? "him" : "her")
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>make it yours</Text>
        <Text style={[styles.headerSubtitle, { color: colors.raisinBlack }]}>
          personalize soari to match your preferences
        </Text>
      </View>

      <View style={styles.content}>
        <BlobContainer>
          <Text style={[styles.sectionTitle, { color: colors.raisinBlack }]}>appearance</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={[styles.preferenceLabel, { color: colors.raisinBlack }]}>dark mode</Text>
              <Text style={[styles.preferenceDescription, { color: colors.raisinBlack }]}>
                switch between light and dark themes
              </Text>
            </View>
            <Switch
              value={mode === "dark"}
              onValueChange={toggleMode}
              trackColor={{ false: "#D1D1D6", true: colors.powderBlue }}
              thumbColor={mode === "dark" ? colors.seasalt : "#FFFFFF"}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={[styles.preferenceLabel, { color: colors.raisinBlack }]}>persona mode</Text>
              <Text style={[styles.preferenceDescription, { color: colors.raisinBlack }]}>
                switch between her and him modes
              </Text>
            </View>
            <Switch
              value={personaMode === "him"}
              onValueChange={handlePersonaModeChange}
              trackColor={{ false: colors.herPrimary, true: colors.himPrimary }}
              thumbColor={"#FFFFFF"}
            />
          </View>
        </BlobContainer>

        <BlobContainer style={styles.modePreview}>
          <Text style={[styles.previewTitle, { color: colors.raisinBlack }]}>preview</Text>
          <View
            style={[
              styles.colorPreview,
              {
                backgroundColor: personaMode === "her" ? colors.herPrimary : colors.himPrimary,
              },
            ]}
          >
            <Text style={styles.colorPreviewText}>primary color</Text>
          </View>
          <View
            style={[
              styles.colorPreview,
              {
                backgroundColor: personaMode === "her" ? colors.herSecondary : colors.himSecondary,
              },
            ]}
          >
            <Text style={styles.colorPreviewText}>secondary color</Text>
          </View>
          <View
            style={[
              styles.colorPreview,
              {
                backgroundColor: colors.sunset,
              },
            ]}
          >
            <Text style={styles.colorPreviewText}>accent color</Text>
          </View>
        </BlobContainer>
      </View>

      <View style={styles.footer}>
        <BlobButton label="complete setup" onPress={() => navigation.navigate("Complete")} style={styles.button} />
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
  },
  preferenceDescription: {
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Light",
    opacity: 0.8,
    marginTop: 2,
  },
  modePreview: {
    marginTop: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    marginBottom: 12,
  },
  colorPreview: {
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  colorPreviewText: {
    color: "white",
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Medium",
  },
  footer: {
    padding: 24,
  },
  button: {
    alignSelf: "center",
  },
})

export default PersonalizationScreen
