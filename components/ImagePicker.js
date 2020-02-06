import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import ColorPalette from "../constants/ColorPalette";

const ImgPicker = props => {
  const [pickerImage, setPickerImage] = useState();
  // Here two ways how to resolve issue with permission to camera on IOS

  // 1: from official dosc
  //   const handleTakeImage = async () => {
  //     let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //     if (permissionResult.granted === false) {
  //       alert("Permission to access camera roll is required!");
  //       return;
  //     }

  //     let pickerResult = await ImagePicker.launchCameraAsync();
  //     console.log(pickerResult);
  //   };

  // 2: using Permission Api
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use this feature."
      );

      return false;
    }

    return true;
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickerImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickerImage ? (
          <Text>No image picker yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickerImage }} />
        )}
      </View>
      <Button title="Take image" color={ColorPalette.lightOrange} onPress={handleTakeImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
