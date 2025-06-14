import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoResults = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={images.noResult}
        style={styles.image}
        resizeMode="contain"
      /> */}
      <Text style={styles.title}>No Result</Text>
      <Text style={styles.subtitle}>We could not find any result</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20, // my-5 (5*4=20)
  },
  image: {
    width: "91.666%", // w-11/12 (11/12 = 91.666%)
    height: 320, // h-80 (80*4=320)
  },
  title: {
    fontSize: 24, // text-2xl
    // fontFamily: "Rubik-Bold",
    color: "#1A1A2C", // text-black-300
    marginTop: 20, // mt-5
  },
  subtitle: {
    fontSize: 16, // text-base
    color: "#666876", // text-black-100
    marginTop: 8, // mt-2
    textAlign: "center",
  },
});

export default NoResults;
