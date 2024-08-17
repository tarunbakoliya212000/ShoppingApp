import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from './screens/ProductListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shopping" component={ProductListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;