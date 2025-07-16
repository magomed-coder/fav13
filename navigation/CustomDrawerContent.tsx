import { CalculatorIcon } from "@/assets/svg/CalculatorIcon";
import { LayersIcon } from "@/assets/svg/LayersIcon";
import { FingerIcon } from "@/assets/svg/FingerIcon";
import { LocationIcon } from "@/assets/svg/LocationIcon";
import { PhoneIcon } from "@/assets/svg/PhoneIcon";
import { ProjectIcon } from "@/assets/svg/ProjectIcon";
import { XIcon } from "@/assets/svg/XIcon";
import { DrawerSection } from "@/components/Drawer/DrawerSection";
import { ProfileHeader } from "@/components/Drawer/ProfileHeader";
import { IconButton } from "@/components/IconButton";
import { COLORS } from "@/constants/theme";
import { useUserContext } from "@/context/user-provider";

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Linking, StyleSheet, View } from "react-native";

interface SectionItem {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
}

export default function CustomDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const { user } = useUserContext();

  const sections: { title: string; items: SectionItem[] }[] = [
    {
      title: "Дополнительно",
      items: [
        {
          title: "Калькулятор",
          onPress: () => navigation.navigate("calculator"),
          icon: <CalculatorIcon />,
        },
        {
          title: "О компании",
          onPress: () => navigation.navigate("about"),
          icon: <LocationIcon />,
        },
        {
          title: "Контакты",
          onPress: () => navigation.navigate("contacts"),
          icon: <PhoneIcon />,
        },
        {
          title: "Шахматка",
          onPress: () => navigation.navigate("chessboard"),
          icon: <LayersIcon />,
        },
      ],
    },
    {
      title: "Ссылки",
      items: [
        {
          title: "Проекты",
          onPress: () => Linking.openURL("https://taplink.cc/favorit13"),
          icon: <FingerIcon />,
        },
        {
          title: "Сайт компании",
          onPress: () => Linking.openURL("https://favorit-today.ru/"),
          icon: <ProjectIcon />,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <ProfileHeader
          onPress={() => navigation.navigate("profile")}
          user={user}
        />

        {sections.map((section, index) => (
          <DrawerSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </View>

      <View style={styles.containerRight}>
        <IconButton
          icon={<XIcon />}
          onPress={() => navigation.closeDrawer()}
          wrapperStyle={styles.iconXWrapper}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.BGWhite,
  },
  containerLeft: {
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: COLORS.BGWhite,
  },
  containerRight: {
    width: "25%",
    backgroundColor: COLORS.BGTransparentGrey,
  },
  iconXWrapper: {
    position: "absolute",
    right: "20%",
    top: 60,
  },
});
