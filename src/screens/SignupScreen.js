import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage, tryLocalSignin } = useContext(
    AuthContext
  );

  useEffect(() => {
    tryLocalSignin();
  }, []);

  const gotoSignin = () => {
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign-up for Tracker "
        onSubmit={signup}
        errorMessage={state.errorMessage}
        buttonTitle="Sign Up"
      />
      <NavLink
        prompt="Already have an account? log in instead"
        onNavigate={gotoSignin}
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});

export default SignupScreen;
