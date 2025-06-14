import icons from "@/constants/icons";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <Image source={icons.search} style={styles.icon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          placeholderTextColor="#666876"
          style={styles.input}
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#F5F6FA", // bg-accent-100
    borderWidth: 1,
    borderColor: "#0061FF33", // border-primary-100 with 20% opacity
    borderRadius: 8,
    marginTop: 20, // mt-5
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 50,
  },
  icon: {
    width: 20, // size-5 (5*4=20)
    height: 20,
  },
  input: {
    fontSize: 14, // text-sm
    // fontFamily: "Rubik",
    color: "#1A1A2C", // text-black-300
    marginLeft: 8, // ml-2
    flex: 1,
    padding: 0, // Reset default padding
    includeFontPadding: false, // Better text alignment
  },
});

export default Search;
