import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Board from "./screens/Board";
import Matches from "./screens/Matches";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Board"
        screenOptions={{ headerShown: false, presentation: "modal" }}
      >
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Matches" component={Matches} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
