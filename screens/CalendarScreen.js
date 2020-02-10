import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import CalendarPicker from "react-native-calendar-picker";

const CalendarScreen = props => {
  const [selectedDay, setSelectedDay] = useState();

  const handleCalendarChange = day => {
    setSelectedDay(day);
  };

  return (
    <View>
      <CalendarPicker onDateChange={handleCalendarChange} />
      <Button
        title="Show day"
        onPress={() => props.navigation.navigate("CalendarDay", { day: selectedDay })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {},
});

export const CalendarScreenNavOptions = {
  headerTitle: "Calendar",
};

export default CalendarScreen;
