import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import ImagePicker from "../components/ImagePicker";

import ColorPalette from "../constants/ColorPalette";

import * as placesActions from "../store/actions/places";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const onTitleChange = value => {
    setTitleValue(value);
  };

  const handleCreatePlace = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  const imageTaken = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const locationPicked = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={onTitleChange} value={titleValue} />
        <ImagePicker onImageTaken={imageTaken} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPicked}
        />
        <Button
          style={styles.submitButton}
          title="Set available period"
          color={ColorPalette.lightGreen}
          onPress={() => props.navigation.navigate("Calendar")}
        />
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

export const NewPlaceScreenNavOptions = {
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
