import React from "react";
import Home from './screens/home';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Result from './screens/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#140c82',
        },
      }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: "Patient Referrals",
            headerTintColor: "white"
            }} />
        <Stack.Screen 
        name="Results" 
        component={Result} 
        options={{
          title: "Referral Result", 
          headerTintColor: "white"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


