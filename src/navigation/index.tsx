// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/screens/home';
import { RootStackParamList, SCREENS } from '../app/screens';
import MovieDetailsScreen from '../app/screens/movieDetails';
import SearchScreen from '../app/screens/search';
import MyDrawer from '../stack/drawerStack';

const Stack = createNativeStackNavigator<RootStackParamList>();


const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name={SCREENS.DRAWER} component={MyDrawer} />
                <Stack.Screen name={SCREENS.MOVIE_DETAILS} component={MovieDetailsScreen} />
                <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default RootNavigation