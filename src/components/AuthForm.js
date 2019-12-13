import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, buttonTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </Spacer>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={buttonTitle}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
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

export default AuthForm;
