import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "../components/Spacer";

const NavLink = ({ onNavigate, prompt }) => {
  return (
    <>
      <TouchableOpacity onPress={onNavigate}>
        <Spacer>
          <Text style={styles.link}>{prompt}</Text>
        </Spacer>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue"
  }
});

export default NavLink;
