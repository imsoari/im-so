"use client"

import type React from "react"
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../theme/theme-provider"
import BlobContainer from "../components/blob-container"
import BlobButton from "../components/blob-button"

const ProfileScreen: React.FC = () => {
  const { colors, mode, toggleMode, personaMode, setPersonaMode } = useTheme()

  const handlePersonaModeChange = () => {
    setPersonaMode(personaMode === "her" ? "him" : "her")
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: mode === "light" ? colors.background : colors.darkBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>your profile</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <BlobContainer style={styles.subscriptionContainer}>
          <View style={styles.subscriptionHeader}>
            <Text style={[styles.subscriptionTitle, { color: colors.raisinBlack }]}>rent free</Text>
            <Text style={[styles.subscriptionSubtitle, { color: colors.raisinBlack }]}>the side character energy</Text>
          </View>

          <View style={[styles.subscriptionBadge, { backgroundColor: colors.sunset }]}>
            <Text style={styles.subscriptionBadgeText}>free tier</Text>
          </View>

          <Text style={[styles.subscriptionDescription, { color: colors.raisinBlack }]}>
            upgrade to unlock unlimited message analysis, detailed situationship tracking, and more
          </Text>

          <BlobButton label="upgrade to gut check" onPress={() => {}} style={styles.upgradeButton} />
        </BlobContainer>

        <BlobContainer>
          <Text style={[styles.sectionTitle, { color: colors.raisinBlack }]}>preferences</Text>

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

        <BlobContainer>
          <Text style={[styles.sectionTitle, { color: colors.raisinBlack }]}>account</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemContent}>
              <Feather name="user" size={20} color={colors.powderBlue} />
              <Text style={[styles.menuItemText, { color: colors.raisinBlack }]}>edit profile</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.raisinBlack} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemContent}>
              <Feather name="bell" size={20} color={colors.powderBlue} />
              <Text style={[styles.menuItemText, { color: colors.raisinBlack }]}>notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.raisinBlack} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemContent}>
              <Feather name="lock" size={20} color={colors.powderBlue} />
              <Text style={[styles.menuItemText, { color: colors.raisinBlack }]}>privacy settings</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.raisinBlack} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuItemContent}>
              <Feather name="help-circle" size={20} color={colors.powderBlue} />
              <Text style={[styles.menuItemText, { color: colors.raisinBlack }]}>help & support</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.raisinBlack} />
          </TouchableOpacity>
        </BlobContainer>

        <TouchableOpacity style={styles.signOutButton} onPress={() => {}}>
          <Text style={styles.signOutText}>sign out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>soari v1.0.0</Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  subscriptionContainer: {
    marginBottom: 16,
  },
  subscriptionHeader: {
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 20,
    fontFamily: "CabinetGrotesk-Medium",
  },
  subscriptionSubtitle: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    opacity: 0.8,
    marginTop: 2,
  },
  subscriptionBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  subscriptionBadgeText: {
    color: "white",
    fontSize: 14,
    fontFamily: "CabinetGrotesk-Medium",
  },
  subscriptionDescription: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    lineHeight: 22,
    marginBottom: 16,
  },
  upgradeButton: {
    alignSelf: "center",
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    marginLeft: 12,
  },
  signOutButton: {
    marginTop: 24,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Medium",
    color: "#FF6B6B",
  },
  versionText: {
    fontSize: 14,
    fontFamily: "FiraSans-Light",
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
})

export default ProfileScreen
