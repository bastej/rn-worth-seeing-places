import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const CalendarDay = props => {
  const { day } = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: day.format("MMM Do YY"),
    });
  }, [day]);

  return (
    <View>
      <Text>Events: </Text>
      <Button title="Add event" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarDay;
