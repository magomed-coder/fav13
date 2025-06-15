import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AvatarIcon } from "@/assets/svg/AvatarIcon";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import icons from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import { useGlobalContext } from "@/context/global-provider";
import { authService } from "@/services/authService";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: object;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress}
    style={({ pressed }) => [
      styles.settingsItemContainer,
      !onPress && styles.disabledItem,
      pressed && styles.pressedItem,
    ]}
  >
    <View style={styles.settingsItemContent}>
      <Image source={icon} style={styles.settingsIcon} />
      <ThemedText variant="m600.15" style={[styles.settingsText, textStyle]}>
        {title}
      </ThemedText>
    </View>
    {onPress && <Image source={icons.rightArrow} style={styles.arrowIcon} />}
  </Pressable>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const router = useRouter();
  // router.push router.replace

  const handleBookings = undefined;
  const handlePayments = undefined;
  const handleNotifications = undefined;
  const handleLanguage = undefined;
  const handleSupport = undefined;
  const handleInvite = undefined;
  const handleProfileEdit = () => router.replace("/(root)/create-username");
  const handleSecurity = () => router.replace("/(root)/change-password");

  // Собираем айтемы с конкретными onPress
  const items = [
    {
      title: "Мои бронирования",
      icon: icons.calendar,
      onPress: handleBookings,
    },
    { title: "Платежи", icon: icons.wallet, onPress: handlePayments },
    { title: "Сменить имя", icon: icons.person, onPress: handleProfileEdit },
    { title: "Сменить пароль", icon: icons.shield, onPress: handleSecurity },
    { title: "Уведомления", icon: icons.bell, onPress: handleNotifications },
    { title: "Язык", icon: icons.language, onPress: handleLanguage },
    { title: "Центр поддержки", icon: icons.info, onPress: handleSupport },
    { title: "Пригласить друзей", icon: icons.people, onPress: handleInvite },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.BGWhite}
        style="dark"
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <ScreenHeader showBack />

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            {user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarBorder]}>
                <AvatarIcon
                  width={130}
                  height={130}
                  fillColor={COLORS.BorderBlack}
                />
              </View>
            )}

            <ThemedText variant="m600.24" style={styles.userName}>
              {user?.userNameInDevice || "Имя"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <SettingsItem icon={icons.calendar} title="Мои бронирования" />
          <SettingsItem icon={icons.wallet} title="Платежи" />
        </View>

        <View style={[styles.section, styles.borderedSection]}>
          {items.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} textStyle={{ width: "auto" }} />
          ))}
        </View>

        <View style={[styles.section, styles.borderedSection]}>
          <SettingsItem
            icon={icons.logout}
            title="Выйти"
            textStyle={styles.dangerText}
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: "rgb(26, 26, 44)",
  },
  bellIcon: {
    width: 20,
    height: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 88,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarBorder: {
    borderColor: COLORS.BorderBlack,
    borderWidth: 3,
    overflow: "hidden",
  },
  pressedItem: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  editButton: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
  },
  userName: {
    textAlign: "center",
  },
  section: {
    marginTop: 30,
  },
  borderedSection: {
    borderTopWidth: 1,
    borderColor: "rgba(0, 97, 255, 0.1)",
    paddingTop: 20,
  },
  settingsItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  disabledItem: {
    opacity: 0.5,
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  settingsText: {
    color: "#1A1A2C",
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  dangerText: {
    color: "#FF3B30",
  },
});

export default Profile;
