import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "addError":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "clearErrorMessage":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};
const validateEmailAndPassword = (email,password) => {
    var emailString = new String(email);
    if (!emailString.includes("@")) {
      throw new Error("email malformed");
    }
    if(password.length < 4){
        throw new Error("password length");
    }
}
const signup = dispatch => async ({ email, password }) => {
  try {
  validateEmailAndPassword(email,password)
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    console.log(err.message);
    switch (err.message) {
      case "email malformed":
        return dispatch({
          type: "addError",
          payload: "Email is malformed"
        });
        case 'password length':
                return dispatch({
                    type: "addError",
                    payload: "Password must be greater than 4 characters"
                  });
      default:
        return dispatch({
          type: "addError",
          payload: "Something went wrong with sign up"
        });
    }
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clearErrorMessage" });
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
   
    await AsyncStorage.setItem("token", response.data.token);
    navigate("TrackList");

    console.log(response.data);
  } catch (err) {
      console.log(err);
      
    dispatch({
      type: "addError",
      payload: "Something went wrong with sign in"
    });
  }
};
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: signout });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
