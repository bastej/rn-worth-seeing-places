import { ADD_PLACE, SET_PLACES } from "../actions/places";
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
    case SET_PLACES: {
      const { places } = action.payload;
      return {
        places: places.map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri)),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
