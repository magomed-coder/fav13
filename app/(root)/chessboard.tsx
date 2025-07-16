import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

interface ChessboardItem {
  id: string;
  name: string;
  url: string;
}

const DeveloperChessboardPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<ChessboardItem[]>([]);

  // Моковый запрос при загрузке страницы
  useEffect(() => {
    const fetchChessboards = async () => {
      try {
        // эмуляция задержки TODO
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setItems(data);
      } catch (error) {
        console.error("Ошибка загрузки данных шахматок:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChessboards();
  }, []);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBack style={styles.containerPaddingHorizontal} />

        {/* Список шахматок */}
        <View style={styles.section}>
          <ThemedText variant="m600.16" style={styles.mainTitle}>
            Шахматки объектов
          </ThemedText>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.BGDeepBlue} />
          ) : (
            items.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleLinkPress(item.url)}
              >
                <ThemedText variant="m500.14" style={styles.linkText}>
                  {`${index + 1}. ${item.name}`}
                </ThemedText>
              </TouchableOpacity>
            ))
          )}
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

  mainTitle: {
    marginBottom: 10,
  },
  linkText: {
    textDecorationLine: "underline",
    marginBottom: 2,
  },
});

export default DeveloperChessboardPage;

// моковые данные
const data: ChessboardItem[] = [
  {
    id: "1",
    name: "ЖК Солнечный",
    url: "https://example.com/solar-chessboard",
  },
  {
    id: "2",
    name: "ЖК Лесной",
    url: "https://example.com/forest-chessboard",
  },
  {
    id: "3",
    name: "ЖК Речной",
    url: "https://example.com/river-chessboard",
  },
];
