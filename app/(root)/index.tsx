import React, { useMemo } from "react";
import {
  Button,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AvatarCircle } from "@/components/AvatarCircle";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/theme";
import { useGlobalContext } from "@/context/global-provider";

import ContractsSection from "@/components/HomePage/ContractsSection";
import StatsSection from "@/components/HomePage/StatsSection";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import images from "@/constants/images";
import { getImageHeight } from "@/hooks/imageUtils";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const Home: React.FC = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const totalPaid =
    user?.receipts.reduce((sum, { payment_amount }) => {
      const amount = parseFloat(payment_amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

  const dealsCount = user?.contracts.length || 0;

  const { width } = useWindowDimensions();

  const imageHeight_1 = useMemo(
    () => getImageHeight(images.bottom_background, width),
    [width]
  );
  const imageHeight_2 = useMemo(
    () => getImageHeight(images.bottom_background_vector, width),
    [width]
  );
  const insets = useSafeAreaInsets();
  console.log(insets);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.BGWhite}
        style="dark"
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}
      >
        <ScreenHeader />
        <ThemedView style={styles.header}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("profile")}
          >
            <AvatarCircle user={user} />
            <View style={styles.profileInfo}>
              <ThemedText
                variant="h1"
                style={styles.username}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user?.userNameInDevice}
              </ThemedText>
              <View>
                <LinearGradient
                  colors={[
                    COLORS.GradientStartLightGreen,
                    COLORS.GradientEndGreen,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              </View>
            </View>
          </TouchableOpacity>

          <StatsSection dealsCount={dealsCount} totalPaid={totalPaid} />
        </ThemedView>

        <ContractsSection contracts={user?.contracts ?? []} />
      </ScrollView>

      {/* Выносим изображение из ScrollView */}
      <Image
        source={images.bottom_background}
        resizeMode="cover"
        style={[
          styles.backgroundImage,
          { width, height: imageHeight_1, bottom: insets.bottom + 80 },
        ]}
      />
      <Image
        source={images.bottom_background_vector}
        resizeMode="cover"
        style={[
          styles.backgroundImage_2,
          { width, height: imageHeight_2, bottom: insets.bottom + 100 },
        ]}
      />

      <TouchableOpacity
        style={[styles.bottomButton, { bottom: insets.bottom + 20 }]}
        onPress={() => Linking.openURL("https://taplink.cc/favorit13")}
      >
        <ThemedText variant="m500.13" style={styles.bottomButtonText}>
          Все проекты
        </ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BGWhite,
    paddingHorizontal: 16,
  },
  containerScroll: {
    flex: 1,
  },

  header: {
    marginBottom: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,

    shadowColor: COLORS.ShadowLight,
    shadowOffset: { width: 3, height: 7 },
    shadowRadius: 8,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileInfo: {
    flexGrow: 1,
    gap: 2,
    paddingBottom: 5,
  },
  gradient: { height: 6, borderRadius: 10 },
  usernameRow: {},
  username: {
    color: COLORS.TextWhite,
  },

  bottomButton: {
    position: "absolute",
    left: 16,
    right: 16,
    backgroundColor: COLORS.BGRed,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  bottomButtonText: {
    color: COLORS.TextWhite,
    textAlign: "center",
  },

  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 80,
    zIndex: -1,
  },
  backgroundImage_2: {
    position: "absolute",
    left: 0,
    right: 0,
    // bottom: 100,
    width: "100%",
    zIndex: -2,
  },
});

export default React.memo(Home);
