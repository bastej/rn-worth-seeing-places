import React from "react";
import { StyleSheet } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
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

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

import PlacesNavigator from "./navigation/PlacesNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
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
