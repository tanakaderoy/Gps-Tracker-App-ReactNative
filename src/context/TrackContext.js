import createDataContext from "./createDataContext";
import tracker from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetchTracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  const response = await tracker.get("/tracks");
  dispatch({ type: "fetchTracks", payload: response.data });
};
const createTrack = dispatch => async (name, locations) => {
  await tracker.post("/tracks", { name, locations });
};
export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
