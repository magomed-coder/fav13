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

import { StatusBar } from "expo-status-bar";
import { realEstateService } from "@/services/realEstateService";
import { RealEstateItem, Role } from "@/types";
import { useUserContext } from "@/context/user-provider";

import { useFocusEffect, useRouter } from "expo-router";

const DeveloperChessboardPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<RealEstateItem[]>([]);

  const { user } = useUserContext();
  const router = useRouter();

  // Проверяем роль и при несоответствии редиректим на главную
  useFocusEffect(
    React.useCallback(() => {
      if (!user) return;

      if (user.user_type !== Role.REALTOR) {
        router.push("/");
      }
    }, [user, router])
  );

  useEffect(() => {
    const fetchChessboards = async () => {
      try {
        const response = await realEstateService.getAll();
        setItems(response);
      } catch (error) {
        console.error("Ошибка загрузки шахматок:", error);
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
                onPress={() => handleLinkPress(item.link)}
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
