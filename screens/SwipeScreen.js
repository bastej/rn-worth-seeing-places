import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PlainText from "../components/PlainText";
import HeaderButton from "../components/HeaderButton";
import Swipe from "../components/Swipe";

class SwipeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <PlainText>Swipe screen</PlainText>
        <Swipe />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "orange",
  },
});

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
