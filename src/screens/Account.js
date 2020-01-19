import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../context/authContext";
import Spacer from "../components/Spacer";
import SafeAreaView from "react-native-safe-area-view";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={styles.text}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name='gear' size={20} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 48
  }
});

export default AccountScreen;
