import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export interface SectionItem {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
}

interface DrawerSectionProps {
  title: string;
  items: SectionItem[];
}

export const DrawerSection: React.FC<DrawerSectionProps> = ({
  title,
  items,
}) => (
  <View style={styles.section}>
    <ThemedText variant="h4" style={styles.sectionTitle}>
      {title}
    </ThemedText>
    {items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={item.onPress}
        style={styles.linkContainer}
      >
        <View style={styles.iconWrapper}>{item.icon}</View>
        <ThemedText variant="h3" style={styles.link}>
          {item.title}
        </ThemedText>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BorderLightGrey,
    paddingBottom: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    paddingLeft: 30,
  },
  iconWrapper: {
    marginRight: 12,
  },
  link: {
    marginVertical: 3,
  },
});
