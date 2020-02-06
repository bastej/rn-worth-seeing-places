import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, imagePath) => async dispatch => {
  const fileName = imagePath.split("/").pop();
  const newImagePath = `${FileSystem.documentDirectory}${fileName}`;

  try {
    await FileSystem.moveAsync({
      from: imagePath,
      to: newImagePath,
    });
    const dbResult = await insertPlace(title, newImagePath, "Braclal", 14.4, 14.2);
    dispatch({
      type: ADD_PLACE,
      payload: { id: dbResult.insertId, title, newImagePath },
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
