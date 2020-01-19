import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "changeName":
      return { ...state, name: action.payload };
    case "addLocation":
      return { ...state, locations: [...state.locations, action.payload] };
    case "startRecording":
      return { ...state, recording: true };
    case "stopRecording":
      return { ...state, recording: false };
    case "addCurrentLocation":
      return { ...state, currentLocation: action.payload };
      case 'reset':
        return {...state,name:'',locations:[]}
    default:
      return state;
  }
};
const changeName = dispatch => name => {
  dispatch({ type: "changeName", payload: name });
};
const startRecording = dispatch => () => {
  dispatch({ type: "startRecording" });
};
const stopRecording = dispatch => () => {
  dispatch({ type: "stopRecording" });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: "addCurrentLocation", payload: location });
  if (recording) {
    dispatch({ type: "addLocation", payload: location });
  }
};
const reset = dispatch => () => {
  dispatch({type:'reset'})
}
export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation ,changeName,reset},
  { name: '', currentLocation: null, recording: false, locations: [] }
);
