import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { PlacesNavigator } from "./navigation/PlacesNavigator";

import rootReducer from "./store/reducers";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("DB Init successs");
  })
  .catch(err => {
    console.log("DB Init failed");
    console.log(err);
  });

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
