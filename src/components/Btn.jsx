import { Image, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { theme } from "../constant";

export default function Btn({ title, submitFunct }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => submitFunct()}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.COLORS.Primary,
    paddingVertical: theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base * 2,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    marginHorizontal: "auto",
  },
  btnText: {
    fontSize: 22,
    color: theme.COLORS.secondary,
    fontWeight: "600",
  },
});
