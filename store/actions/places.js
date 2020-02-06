import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, imagePath) => async dispatch => {
  const fileName = imagePath.split("/").pop();
  const newImagePath = `${FileSystem.documentDirectory}${fileName}`;

  try {
    await FileSystem.moveAsync({
      from: imagePath,
      to: newImagePath,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }

  dispatch({
    type: ADD_PLACE,
    payload: { title, newImagePath },
  });
};
