import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export default StyleSheet.create({
  /** Root wrapper */
  container: {
    flex: 1,
    backgroundColor: COLORS.BGWhite,
    paddingHorizontal: 16,
  },

  /** Big centered title “Акт сверки” */
  mainTitle: {
    marginBottom: 8,
    textAlign: "center",
  },

  /** Subtitle under main title */
  subTitle: {
    marginBottom: 16,
    textAlign: "center",
  },

  /** Header before receipts list */
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
  },

  /** Container for the list of receipts */
  receiptsList: {
    marginTop: 10,
  },
});
