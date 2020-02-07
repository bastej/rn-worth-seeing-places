import React, { useEffect } from "react";
import { StyleSheet, Platform, FlatList } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import SinglePlace from "../components/SinglePlace";

import * as placesActions from "../store/actions/places";

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <SinglePlace
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={() => {
              props.navigation.navigate("PlaceDetail", {
                placeId: itemData.item.id,
                placeTitle: itemData.item.title,
              });
            }}
          />
        );
      }}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate("NewPlace")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
