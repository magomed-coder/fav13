import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { ThemedText } from "../ThemedText";

export type OptionItem = {
  key: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  selectedValue: OptionItem;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  selectedValue,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const buttonRef = useRef<View>(null);

  const [top, setTop] = useState(0);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setExpanded(false);
  }, []);
  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset +
          heightOfComponent +
          (Platform.OS === "android" ? 3 : heightOfComponent + 10);

        console.log(JSON.stringify(layout, null, 2));

        setTop(finalValue);
      }}
      style={styles.wrapper}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <ThemedText variant="m500.14" style={styles.text}>
          {selectedValue.label}
        </ThemedText>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.key}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <ThemedText variant="m500.14">{item.label}</ThemedText>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: COLORS.BGGrey,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 10,
  },
  backdrop: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    height: 50,
    justifyContent: "center",
    color: COLORS.TextBlack,
    backgroundColor: COLORS.BGWhite,
    fontSize: 15,
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 6,
    maxHeight: 250,

    shadowColor: COLORS.BGDarkBlue,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    opacity: 0.8,
    height: 50,
    lineHeight: 48,

    color: COLORS.TextBlack,
    backgroundColor: COLORS.BGWhite,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
    paddingRight: 20,
  },
});
