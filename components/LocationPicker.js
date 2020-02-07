import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MapPreview from "../components/MapPreview";

import ColorPalette from "../constants/ColorPalette";

const LocationPicker = () => {
  const [pickedLoaction, setPickedLocation] = useState();
  const [isLoading, setIsLoading] = useState();

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
      const location = await Location.getCurrentPositionAsync({ timeout: 500 });
      console.log(location);
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please true again or pick a location on the map");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview style={styles.mapPreview} location={pickedLoaction}>
          {isLoading ? <ActivityIndicator size="large" /> : <Text>No location chosen yet!</Text>}
        </MapPreview>
      </View>
      <Button
        title="Get User Location"
        color={ColorPalette.lightOrange}
        onPress={handleGetLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: { marginBottom: 15 },
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocationPicker;
