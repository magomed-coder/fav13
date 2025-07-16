import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";

const AboutPage: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="dark" />
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader showBack style={styles.containerPaddingHorizontal} />

      <View style={styles.section}>
        <ThemedText variant="m600.17" style={styles.mainTitle}>
          Мы меняем рынок исламской рассрочки, делая его более гибким и
          доступным для общества.
        </ThemedText>

        <ThemedText variant="m400.14" style={styles.itemDescription}>
          Рассрочка без нарушения норм ислама осуществляется с целью развития
          предпринимательской деятельности и улучшения жизненного благополучия
          людей, позволяющего им спокойно жить, работать, обзаводиться семьей и
          чувствовать уверенность в завтрашнем дне.
        </ThemedText>

        {/* Блоки статистики */}
        <View style={styles.statsSection}>
          {stats.map(({ id, value, label, bg }) => (
            <View key={id} style={[styles.statBlock, { backgroundColor: bg }]}>
              <View style={styles.statBlockInner}>
                <ThemedText variant="m600.21" style={styles.statValue}>
                  {value}
                </ThemedText>
                <ThemedText variant="m400.14" style={styles.statLabel}>
                  {label}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        <ThemedText variant="m600.16" style={styles.itemTitle}>
          О компании
        </ThemedText>
        <ThemedText variant="m400.14" style={styles.itemDescription}>
          «Favorit-13» — молодая компания с высокими темпами развития, является
          крупной финансовой организацией в Чеченской Республике, которая
          занимается исламской рассрочкой и предоставляет финансовые услуги в
          строгом соответствии с нормами шариата и требованиями законодательства
          РФ. Двери компании открыты для всех клиентов, независимо от
          религиозной принадлежности. «Favorit-13» сотрудничает со многими
          авторитетными экспертами в области исламских финансов и имеет
          “Сертификат соответствия деятельности компании нормам ислама”.
          {"\n"} {"\n"}
          Партнерство с крупными девелоперами и поставщиками техники,
          сотрудничество с крупными организациями и производствами региона
          делает компанию надежной и привлекательной для клиентов и сотрудников.
        </ThemedText>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BGWhite,
    flex: 1,
  },
  containerPaddingHorizontal: {
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  mainTitle: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 15,
  },
  itemTitle: {
    marginTop: 10,
  },
  itemDescription: {
    marginBottom: 25,
  },
  statsSection: {
    alignItems: "center",
  },
  statBlock: {
    borderRadius: 15,
    borderBottomEndRadius: 0,
    borderTopLeftRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 246,
    height: 80,
  },
  statBlockInner: { width: "80%" },
  statValue: {
    textAlign: "center",
    lineHeight: 20,
  },
  statLabel: {
    textAlign: "center",
  },
});

export default AboutPage;

const stats = [
  {
    id: "1",
    value: "100 %",
    label: "довольных клиентов",
    bg: "rgba(236, 247, 255, 1)",
  },
  {
    id: "2",
    value: "7000 +",
    label: "успешных сделок с открытия компании",
    bg: "rgba(219, 240, 255, 1)",
  },
  {
    id: "3",
    value: "6 лет",
    label: "максимальный срок рассрочки",
    bg: "rgba(193, 223, 245, 1)",
  },
];
