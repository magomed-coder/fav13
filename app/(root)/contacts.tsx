import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";

import images from "@/constants/images";
import { StatusBar } from "expo-status-bar";

const ContactsPage = () => {
  const handlePhonePress = (phoneNumber: string) => {
    const cleanedPhone = phoneNumber.replace(/[^\d+]/g, "");
    Linking.openURL(`tel:${cleanedPhone}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBack style={styles.containerPaddingHorizontal} />

        <View style={styles.section}>
          <ThemedText variant="m600.16" style={styles.mainTitle}>
            Адреса
          </ThemedText>
          <ThemedText variant="m500.14">
            Фактический и юридический адрес
          </ThemedText>
          <ThemedText variant="m400.14" style={styles.text}>
            г. Грозный, просп. Кадырова, 3/25
          </ThemedText>
          <ThemedText variant="m400.14" style={styles.text}>
            г. Грозный, ул. Шейха Али Митаева, 85
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText variant="m500.14" style={styles.sectionTitle}>
            Отдел по работе с клиентами
          </ThemedText>
          <TouchableOpacity
            onPress={() => handlePhonePress("+7 (908) 001-13-13")}
          >
            <ThemedText variant="m400.14" style={styles.linkText}>
              +7 (908) 001-13-13
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText variant="m500.14" style={styles.sectionTitle}>
            Отдел по работе с клиентами
          </ThemedText>
          <TouchableOpacity
            onPress={() => handlePhonePress("+7 (928) 751-13-13")}
          >
            <ThemedText variant="m400.14" style={styles.linkText}>
              +7 (928) 751-13-13
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText variant="m500.14" style={styles.sectionTitle}>
            Email
          </ThemedText>
          <TouchableOpacity
            onPress={() => handleEmailPress("rassrochka.013@mail.ru")}
          >
            <ThemedText variant="m400.14" style={styles.linkText}>
              rassrochka.013@mail.ru
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText variant="m500.14" style={styles.sectionTitle}>
            График работы
          </ThemedText>
          <ThemedText variant="m400.14" style={styles.text}>
            ПН-ПТ: 09:00-18:00
          </ThemedText>
        </View>

        <View style={styles.mapSection}>
          <ThemedText variant="m600.16" style={styles.mapTitle}>
            Посмотреть на карте
          </ThemedText>

          <Image source={images.map13} style={[styles.map]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BGWhite,
    flex: 1,
  },
  containerPaddingHorizontal: {
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  mapSection: {},
  mainTitle: {
    marginBottom: 8,
  },
  mapTitle: {
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {},
  text: {},
  linkText: {
    textDecorationLine: "underline",
  },
  map: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
});

export default ContactsPage;
