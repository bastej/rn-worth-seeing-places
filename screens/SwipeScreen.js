import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PlainText from "../components/PlainText";
import HeaderButton from "../components/HeaderButton";

const SwipeScreen = props => {
  return (
    <View>
      <PlainText>Swipe screen</PlainText>
    </View>
  );
};

const styles = StyleSheet.create({});

export const SwipeScreenNavOptions = navData => ({
  headerTitle: "Swipe Gestures",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

export default SwipeScreen;
