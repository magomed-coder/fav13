import { useDebug } from "@/context/debug-context";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DebugPanel = () => {
  const { debugData, clearDebugData } = useDebug();

  // if (__DEV__ || !debugData) return null;
  if (!debugData) return null;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text selectable style={styles.text}>
          {JSON.stringify(debugData, null, 2)}
        </Text>
      </ScrollView>
      <Text style={styles.clear} onPress={clearDebugData}>
        ✖
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    maxHeight: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    zIndex: 9999,
  },
  text: {
    fontSize: 12,
    color: "#111",
  },
  clear: {
    position: "absolute",
    top: 5,
    right: 10,
    fontWeight: "bold",
    color: "#f00",
    fontSize: 18,
  },
});

export default DebugPanel;
