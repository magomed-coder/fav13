import { Image, ImageSourcePropType, Platform } from "react-native";

export function getImageHeight(
  image: ImageSourcePropType | string,
  screenWidth: number
): Promise<number> {
  // 1) Native static module: we can still do it synchronously
  if (Platform.OS !== "web" && typeof image === "number") {
    const { width, height } = Image.resolveAssetSource(image);
    return Promise.resolve((screenWidth * height) / width);
  }

  // 2) Object with uri (remote or web‐static)
  let uri: string;
  if (typeof image === "object" && image !== null && "uri" in image) {
    uri = (image as any).uri;
  }
  // 3) Or bare string
  else if (typeof image === "string") {
    uri = image;
  } else {
    return Promise.reject(
      new Error("getImageHeight: invalid image source: " + String(image))
    );
  }

  // 4) Fallback: async getSize
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve((screenWidth * height) / width),
      (error) => reject(error)
    );
  });
}
