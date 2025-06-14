// import { ArrowIcon } from "@/assets/svg/ArrowIcon";
// import { DividerIcon } from "@/assets/svg/DividerIcon";
// import { Logo } from "@/components/Logo";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { IconButton } from "./IconButton";
import { Logo } from "./Logo";

interface HeaderProps {
  /** Container style overrides */
  style?: StyleProp<ViewStyle>;
  /** Показывать кнопку "назад" слева */
  showBack?: boolean;
  /** Callback при нажатии на кнопку назад */
  onPressBack?: () => void;
  /** Callback при нажатии на кнопку меню (справа) */
  onPressDrawer?: () => void;
}

export const ScreenHeader: React.FC<HeaderProps> = ({
  style,
  showBack = false,
  onPressBack,
  onPressDrawer,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleBack = onPressBack ?? (() => navigation.goBack());
  const handleDrawer = onPressDrawer ?? (() => navigation.openDrawer());

  return (
    <View style={[styles.container, style]}>
      {/* {showBack ? (
        <IconButton
          icon={<ArrowIcon rotation={180} width={10} height={20} />}
          onPress={handleBack}
          wrapperStyle={styles.sideButtonContainer}
        />
      ) : null} */}
      <Logo />
      {/* 
      <IconButton
        icon={<DividerIcon />}
        onPress={handleDrawer}
        wrapperStyle={styles.iconWrapper}
        containerStyle={styles.button}
      /> */}
      <Button title="x" onPress={handleDrawer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  sideButtonContainer: {
    position: "absolute",
    left: 0,
    top: "50%",
  },
  iconWrapper: {
    position: "absolute",
    right: 0,
    top: "50%",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
  },
});
