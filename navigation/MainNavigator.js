import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PlacesListScreen, { PlacesListScreenNavOptions } from "../screens/PlacesListScreen";
import NewPlaceScreen, { NewPlaceScreenNavOptions } from "../screens/NewPlaceScreen";
import PlaceDetailScreen, { PlaceDetailScreenNavOptions } from "../screens/PlaceDetailScreen";
import CalendarScreen, { CalendarScreenNavOptions } from "../screens/CalendarScreen";
import CalendarDayScreen, { CalendarDayNavOptions } from "../screens/CalendarDayScreen";
import SwipeScreen, { SwipeScreenNavOptions } from "../screens/SwipeScreen";
import MapScreen from "../screens/MapScreen";

import ColorPalette from "../constants/ColorPalette";

const StackNavigator = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

const drawerButton = {
  drawerIcon: props => (
    <Ionicons
      name={Platform.OS === "android" ? "md-create" : "ios-create"}
      size={23}
      color={props.color}
    />
  ),
};

const PlacesNavigator = () => (
  <StackNavigator.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? ColorPalette.darkGreen : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : ColorPalette.darkGreen,
    }}
  >
    <StackNavigator.Screen
      name="Places"
      component={PlacesListScreen}
      options={PlacesListScreenNavOptions}
    />
    <StackNavigator.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={PlaceDetailScreenNavOptions}
    />
    <StackNavigator.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={NewPlaceScreenNavOptions}
    />
    <StackNavigator.Screen name="Map" component={MapScreen} />
    <StackNavigator.Screen
      name="Calendar"
      component={CalendarScreen}
      options={CalendarScreenNavOptions}
    />
    <StackNavigator.Screen
      name="CalendarDay"
      component={CalendarDayScreen}
      options={CalendarDayNavOptions}
    />
  </StackNavigator.Navigator>
);

const SwipingNavigator = () => (
  <StackNavigator.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? ColorPalette.darkGreen : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : ColorPalette.darkGreen,
    }}
  >
    <StackNavigator.Screen
      name="SwipeGesture"
      component={SwipeScreen}
      options={SwipeScreenNavOptions}
    />
  </StackNavigator.Navigator>
);

export const MainNavigator = () => (
  <DrawerNavigator.Navigator>
    <DrawerNavigator.Screen
      name="Great Places"
      component={PlacesNavigator}
      options={drawerButton}
    />
    <DrawerNavigator.Screen name="Swiping" component={SwipingNavigator} options={drawerButton} />
  </DrawerNavigator.Navigator>
);
