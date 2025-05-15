"use client"

import type React from "react"
import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../../theme/theme-provider"
import BlobButton from "../../components/blob-button"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { OnboardingStackParamList } from "../../navigation/navigation-types"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"

type FeatureTourScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, "FeatureTour">
}

interface Feature {
  id: string
  title: string
  description: string
  image: string
}

const { width } = Dimensions.get("window")

const FeatureTourScreen: React.FC<FeatureTourScreenProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const opacity = useSharedValue(1)

  const features: Feature[] = [
    {
      id: "1",
      title: "chat with soari",
      description:
        "talk to soari in two different personas - flow for gentle reflection or truth for straightforward insights",
      image: "/placeholder-t3lmz.png",
    },
    {
      id: "2",
      title: "decode messages",
      description: "analyze text messages to understand their true meaning and emotional subtext",
      image: "/placeholder-xrl80.png",
    },
    {
      id: "3",
      title: "situationship clarity",
      description: "get insights on your undefined connections and track relationship patterns over time",
      image: "/placeholder-xju0t.png",
    },
    {
      id: "4",
      title: "emotional intelligence",
      description: "develop self-awareness and navigate relationships with confidence and clarity",
      image: "/emotional-intelligence.png",
    },
  ]

  const handleNext = () => {
    if (currentIndex < features.length - 1) {
      const nextIndex = currentIndex + 1
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
      setCurrentIndex(nextIndex)
    } else {
      navigation.navigate("Personalization")
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  const handleScroll = (index: number) => {
    opacity.value = withTiming(0, { duration: 100 }, () => {
      setCurrentIndex(index)
      opacity.value = withTiming(1, { duration: 300 })
    })
  }

  const renderFeature = ({ item, index }: { item: Feature; index: number }) => {
    return (
      <View style={styles.featureSlide}>
        <Image source={{ uri: item.image }} style={styles.featureImage} />
        <Text style={[styles.featureTitle, { color: colors.raisinBlack }]}>{item.title}</Text>
        <Text style={[styles.featureDescription, { color: colors.raisinBlack }]}>{item.description}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.raisinBlack }]}>discover soari</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={features}
        renderItem={renderFeature}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width)
          handleScroll(index)
        }}
      />

      <View style={styles.paginationContainer}>
        {features.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? colors.powderBlue : colors.powderBlue + "40",
                width: index === currentIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <Text style={[styles.featureCount, { color: colors.raisinBlack }]}>
          {currentIndex + 1} of {features.length}
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <BlobButton
          label={currentIndex === features.length - 1 ? "continue" : "next"}
          onPress={handleNext}
          style={styles.button}
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
  featureSlide: {
    width,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  featureImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 22,
    fontFamily: "CabinetGrotesk-Medium",
    textAlign: "center",
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Light",
    textAlign: "center",
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  featureCount: {
    fontSize: 14,
    fontFamily: "FiraSans-Light",
    marginTop: 16,
    opacity: 0.6,
  },
  footer: {
    padding: 24,
  },
  button: {
    alignSelf: "center",
  },
})

export default FeatureTourScreen
