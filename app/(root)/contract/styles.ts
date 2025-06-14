import { COLORS } from "@/constants/theme";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.BGWhite,
    paddingHorizontal: 16,
  },
  mainTitle: {
    marginBottom: 3,
    marginTop: 15,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 7,
  },
  detailTextWrapper: {
    flexShrink: 1,
  },
  contractNumber: {},
  contractDate: {},
  summaryText: { textAlign: "center", color: COLORS.TextWhite },
  summarySubText: { textAlign: "center", color: COLORS.TextWhite },
  dividerLine: {
    flexGrow: 1,
    borderBottomWidth: 0.5,
    borderColor: COLORS.BorderBlack,
    marginTop: 7,
    borderStyle: "dashed",
  },
  nomenclatureText: {
    marginBottom: 20,
  },
  summaryContainer: {
    paddingVertical: 8,
    marginBottom: 30,
    borderRadius: 9,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  sectionTitle: {},
  yearText: {
    color: COLORS.TextGreyLight,
  },
  receiptsContainer: {
    position: "relative",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  receiptsScroll: {
    paddingVertical: 22,
    paddingBottom: 25,
  },
  receiptBadge: {
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    marginHorizontal: 9,
  },
  receiptMonthText: {
    textAlign: "center",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 1,
    padding: 6,
  },
  leftArrow: {
    left: 0,
    transform: [{ translateY: -14 }],
  },
  rightArrow: {
    right: 0,
    transform: [{ translateY: -14 }],
  },
  actualReceiptDataText: {
    marginTop: 10,
  },
  actualReceiptBox: {
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  paymentRow: { backgroundColor: "rgba(236, 247, 255, 1)" },
  actualReceiptTopText: {},
  receiptDataText: {},
});

export default styles;
