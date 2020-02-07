import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MapPreview from "../components/MapPreview";

import ColorPalette from "../constants/ColorPalette";

const LocationPicker = props => {
  const [pickedLoaction, setPickedLocation] = useState();
  const [isLoading, setIsLoading] = useState();

  const selectedLocation = props.navigation.getParam("selectedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if (selectedLocation) {
      setPickedLocation(selectedLocation);
      onLocationPicked(selectedLocation);
    }
  }, [selectedLocation, onLocationPicked]);

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permissions to use this feature."
      );

      return false;
    }

    return true;
  };

  const handleGetLocation = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) return;

    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
      onLocationPicked({ lat: location.coords.latitude, lng: location.coords.longitude });
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please true again or pick a location on the map");
    }
    setIsLoading(false);
  };

  const handlePickOnMap = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview onPress={handlePickOnMap} style={styles.mapPreview} location={pickedLoaction}>
          {isLoading ? (
            <ActivityIndicator size="large" color={ColorPalette.green} />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        </MapPreview>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Get User Location"
          color={ColorPalette.lightOrange}
          onPress={handleGetLocation}
        />
        <Button title="Pick on map" color={ColorPalette.lightOrange} onPress={handlePickOnMap} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: { marginBottom: 15 },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
