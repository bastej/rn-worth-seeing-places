import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, Platform, TouchableOpacity } from "react-native";

import MapView, { Marker } from "react-native-maps";

import ColorPalette from "../constants/ColorPalette";

const MapScreen = props => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = event => {
    if (readonly) return;
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      return;
    }

    props.navigation.navigate("NewPlace", { selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: handleSavePickedLocation });
  }, [handleSavePickedLocation]);

  let markerCoords;

  if (selectedLocation) {
    markerCoords = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView style={styles.map} region={mapRegion} onPress={handleSelectLocation}>
      {markerCoords && <Marker title="Picked Location" coordinate={markerCoords}></Marker>}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveLoc = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");

  if (readonly) return {};

  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveLoc}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : ColorPalette.darkGreen,
  },
});

export default MapScreen;
