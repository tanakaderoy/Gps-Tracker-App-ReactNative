import "../_mockLocation";
import React, { useContext,useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import { NavigationEvents, withNavigationFocus } from "react-navigation";
import TrackForm from "../components/TrackForm";
import {FontAwesome} from '@expo/vector-icons'

const TrackCreateScreen = ({isFocused}) => {
  const { state: {recording},addLocation } = useContext(LocationContext);
  const callback = useCallback(location => {
    addLocation(location,recording)
  },[recording])
  const [err] = useLocation(isFocused || recording,callback);

  return (

    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h3 style={styles.text}>
        Create a track
      </Text>
      <Map />
      {err ? <Text> Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
TrackCreateScreen.navigationOptions = {
  title:'Add Track',
  tabBarIcon: <FontAwesome name='plus' size={20}/>
}
const styles = StyleSheet.create({
  text: {
    fontSize: 48
  }
});

export default withNavigationFocus(TrackCreateScreen);
