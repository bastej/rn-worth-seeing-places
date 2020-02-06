import * as FileSystem from "expo-file-system";
import { insertPlace } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

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
