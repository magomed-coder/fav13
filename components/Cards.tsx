import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: any;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={featuredStyles.container}>
      <Image source={{ uri: item.image }} style={featuredStyles.image} />

      <Image source={images.cardGradient} style={featuredStyles.gradient} />

      <View style={featuredStyles.ratingContainer}>
        <Image source={icons.star} style={featuredStyles.starIcon} />
        <Text style={featuredStyles.ratingText}>{item.rating}</Text>
      </View>

      <View style={featuredStyles.bottomContainer}>
        <Text style={featuredStyles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={featuredStyles.address} numberOfLines={1}>
          {item.address}
        </Text>

        <View style={featuredStyles.footer}>
          <Text style={featuredStyles.price}>${item.price}</Text>
          <Image source={icons.heart} style={featuredStyles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={cardStyles.container} onPress={onPress}>
      <View style={cardStyles.ratingContainer}>
        <Image source={icons.star} style={cardStyles.starIcon} />
        <Text style={cardStyles.ratingText}>{item.rating}</Text>
      </View>

      <Image source={{ uri: item.image }} style={cardStyles.image} />

      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{item.name}</Text>
        <Text style={cardStyles.address}>{item.address}</Text>

        <View style={cardStyles.footer}>
          <Text style={cardStyles.price}>${item.price}</Text>
          <Image
            source={icons.heart}
            style={cardStyles.heartIcon}
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// FeaturedCard Styles
const featuredStyles = StyleSheet.create({
  container: {
    width: 240,
    height: 320,
    borderRadius: 16,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: "absolute",
    top: 20,
    right: 20,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    // fontFamily: "Rubik-Bold",
    color: "#0061FF",
    marginLeft: 4,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 20,
    // fontFamily: "Rubik-ExtraBold",
    color: "#FFFFFF",
  },
  address: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: "#FFFFFF",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  price: {
    fontSize: 20,
    // fontFamily: "Rubik-ExtraBold",
    color: "#FFFFFF",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});

// Card Styles
const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 16,
    padding: 12,
    shadowColor: "rgba(0, 0, 0, 0.7)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 4,
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 50,
  },
  starIcon: {
    width: 10,
    height: 10,
  },
  ratingText: {
    fontSize: 12,
    // fontFamily: "Rubik-Bold",
    color: "#0061FF",
    marginLeft: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  content: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    // fontFamily: "Rubik-Bold",
    color: "#1A1A2C",
  },
  address: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: "#666876",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    // fontFamily: "Rubik-Bold",
    color: "#0061FF",
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
