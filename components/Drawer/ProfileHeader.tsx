import { ArrowIcon } from "@/assets/svg/ArrowIcon";
import { AvatarCircle } from "@/components/AvatarCircle";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import { UserData } from "@/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  onPress: () => void;
  user: UserData | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onPress,
  user,
}) => (
  <TouchableOpacity style={styles.profileHeader} onPress={onPress}>
    <View style={styles.profileInfo}>
      <AvatarCircle
        user={user}
        size={48}
        style={styles.avatarWrapper}
        circleColor={COLORS.BGLighterBlue}
        letterColor={COLORS.TextDeepBlue}
        borderColor={COLORS.BorderDeepBlue}
      />
      <View style={styles.textWrapper}>
        <ThemedText
          variant="m600.12"
          style={styles.nameText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user?.userNameInDevice || "Гость"}
        </ThemedText>
        <ThemedText
          variant="m400.10"
          style={styles.subText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Данные о пользователе
        </ThemedText>
      </View>
    </View>
    <ArrowIcon />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  textWrapper: {
    flexShrink: 1,
  },
  nameText: {
    fontWeight: "600",
    flexShrink: 1,
  },
  subText: {
    flexShrink: 1,
  },
});
