import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constant";

const CustomDatePicker = ({ value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [count, setCount] = useState(0);
  const handleDateChange = (event, selectedDate) => {
    console.log("Current Date>>>>>>>>>", selectedDate);
    setShowDatePicker(false);
    onChange(selectedDate);
  };

  const showDatePickerModal = () => {
    console.log("COUNT", count);
    console.log("VALUE", value);

    if (count < 1) {
      setShowDatePicker(true);
      setCount(count + 1);
    } else {
      setShowDatePicker(false);
      onChange(null);
      setCount(0);
      value = null;
      console.log("VALUE2", value);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={showDatePickerModal} style={styles.datePicker}>
        <Text style={styles.date}>
          {count < 1 ? (
            <Ionicons name="calendar" size={24} color="gray" />
          ) : value ? (
            value.toLocaleDateString()
          ) : (
            ""
          )}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        style={{
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={styles.modalHeaderButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={styles.modalHeaderButton}>Done</Text>
            </TouchableOpacity>
          </View>
          {Platform.OS === "ios" ? (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="inline"
              onChange={handleDateChange}
              maximumDate={new Date()} // to set max date
              minimumDate={new Date(1990, 0, 1)} // to set min date
            />
          ) : (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()} // to set max date
              minimumDate={new Date(1990, 0, 1)} // to set min date
            />
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 8,
  },
  date: {
    color: "#333",
  },
  modal:
    Platform.OS === "ios"
      ? {
          backgroundColor: theme.COLORS.Primary,
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingTop: 30,
          margin: 20,
          top: 106,
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }
      : {
          paddingHorizontal: 20,
          paddingTop: 30,
        },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalHeaderButton: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CustomDatePicker;
