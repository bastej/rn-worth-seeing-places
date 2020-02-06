import { ADD_PLACE } from "../actions/places";
import Place from "../../models/Place";

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const { id, title, newImagePath } = action.payload;
      const newPlace = new Place(id.toString(), title, newImagePath);

      return { places: state.places.concat(newPlace) };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
