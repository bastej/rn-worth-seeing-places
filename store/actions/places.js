import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, imagePath, location) => async dispatch => {
  const addressJSON = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${
      ENV().googleApiKey
    }`
  );

  if (!addressJSON.ok) throw new Error("Something went wrong!");

  const address = await addressJSON.json();

  if (!address.results) throw new Error("Something went wrong!");

  const formattedAddress = address.results[0].formatted_address;

  const fileName = imagePath.split("/").pop();
  const newImagePath = `${FileSystem.documentDirectory}${fileName}`;

  try {
    await FileSystem.moveAsync({
      from: imagePath,
      to: newImagePath,
    });
    const dbResult = await insertPlace(
      title,
      newImagePath,
      formattedAddress,
      location.lat,
      location.lng
    );
    dispatch({
      type: ADD_PLACE,
      payload: {
        id: dbResult.insertId,
        title,
        newImagePath,
        address: formattedAddress,
        coords: { lat: location.lat, lng: location.lng },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadPlaces = () => async dispatch => {
  try {
    const dbResult = await fetchPlaces();
    dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
  } catch (err) {
    console.log(err);
  }
};
