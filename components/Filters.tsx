import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={[
            styles.filterItem,
            selectedCategory === item.category && styles.selectedFilterItem,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedCategory === item.category && styles.selectedFilterText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 12, // mt-3
    marginBottom: 8, // mb-2
  },
  filterItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16, // mr-4
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 20, // rounded-full approximation
    backgroundColor: "#E6EFFF", // bg-primary-100
    borderWidth: 1,
    borderColor: "rgba(0, 97, 255, 0.1)", // border-primary-200
  },
  selectedFilterItem: {
    backgroundColor: "#0061FF", // bg-primary-300
    borderWidth: 0,
  },
  filterText: {
    fontSize: 14, // text-sm
    color: "#1A1A2C", // text-black-300
    // fontFamily: "Rubik",
  },
  selectedFilterText: {
    color: "#FFFFFF", // text-white
    // fontFamily: "Rubik-Bold",
    marginTop: 2, // mt-0.5 approximation
  },
});

export default Filters;
