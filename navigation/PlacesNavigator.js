import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";

import PlacesListScreen, { PlacesListScreenNavOptions } from "../screens/PlacesListScreen";
import NewPlaceScreen, { NewPlaceScreenNavOptions } from "../screens/NewPlaceScreen";
import PlaceDetailScreen, { PlaceDetailScreenNavOptions } from "../screens/PlaceDetailScreen";
import CalendarScreen, { CalendarScreenNavOptions } from "../screens/CalendarScreen";
import CalendarDayScreen, { CalendarDayNavOptions } from "../screens/CalendarDayScreen";
import MapScreen from "../screens/MapScreen";

import ColorPalette from "../constants/ColorPalette";

const PlacesStackNavigator = createStackNavigator();

export const PlacesNavigator = () => (
  <PlacesStackNavigator.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? ColorPalette.darkGreen : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : ColorPalette.darkGreen,
    }}
  >
    <PlacesStackNavigator.Screen
      name="Places"
      component={PlacesListScreen}
      options={PlacesListScreenNavOptions}
    />
    <PlacesStackNavigator.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={PlaceDetailScreenNavOptions}
    />
    <PlacesStackNavigator.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={NewPlaceScreenNavOptions}
    />
    <PlacesStackNavigator.Screen name="Map" component={MapScreen} />
    <PlacesStackNavigator.Screen
      name="Calendar"
      component={CalendarScreen}
      options={CalendarScreenNavOptions}
    />
    <PlacesStackNavigator.Screen
      name="CalendarDay"
      component={CalendarDayScreen}
      options={CalendarDayNavOptions}
    />
  </PlacesStackNavigator.Navigator>
);
