import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from './screens/ProductListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';

const Stack = createNativeStackNavigator();
const CustomHeaderTitle = () => (
  <Text style={styles.headerTitle}>Shopping</Text>
);
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00bcd4',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            textDecorationLine: 'underline', 

          },
        }}
      >
        <Stack.Screen
          name="Shopping"
          component={ProductListScreen}
          options={{
            headerTitle: props => <CustomHeaderTitle {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
export default App;