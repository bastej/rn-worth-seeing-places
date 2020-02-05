import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from "react-native";

import ColorPalette from "../constants/ColorPalette";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");

  const onTitleChange = value => {
    setTitleValue(value);
  };

  const handleCreatePlace = () => {};

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={onTitleChange} value={titleValue} />
        <Button
          style={styles.submitButton}
          title="Add Place"
          color={ColorPalette.green}
          onPress={handleCreatePlace}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: { margin: 30 },
  label: { fontSize: 18, marginBottom: 15 },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  submitButton: {},
});

export default NewPlaceScreen;
