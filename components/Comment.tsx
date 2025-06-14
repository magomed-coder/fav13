import icons from "@/constants/icons";
import { Review } from "@/types";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  item: Review;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.commentText}>{item.review}</Text>

      <View style={styles.footer}>
        <View style={styles.likesContainer}>
          <Image
            source={icons.heart}
            style={styles.heartIcon}
            tintColor="#0061FF"
          />
          <Text style={styles.likesCount}>120</Text>
        </View>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontSize: 16,
    // fontFamily: "Rubik-Bold",
    color: "#1A1A2C",
    marginLeft: 12,
  },
  commentText: {
    color: "#666876",
    fontSize: 16,
    // fontFamily: "Rubik",
    marginTop: 8,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  likesCount: {
    color: "#1A1A2C",
    fontSize: 14,
    // fontFamily: "Rubik-Medium",
    marginLeft: 8,
  },
  date: {
    color: "#666876",
    fontSize: 14,
    // fontFamily: "Rubik",
  },
});

export default Comment;
