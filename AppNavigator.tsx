// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import History from './src/screens/History';
import ReadImage from './src/screens/ReadImage';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
        <Stack.Screen name="History" component={History}  options={{ headerShown: false }} />
        <Stack.Screen name="ReadImage" component={ReadImage}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
