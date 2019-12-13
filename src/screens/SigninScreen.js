import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const gotoSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign In to Your Account "
        onSubmit={signin}
        errorMessage={state.errorMessage}
        buttonTitle="Sign In"
      />
      <NavLink
        prompt="Don't have an account? Sign up instead"
        onNavigate={gotoSignup}
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15
  },
  link: {
    color: "blue"
  }
});

export default SigninScreen;
