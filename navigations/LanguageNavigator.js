import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTES } from '../constants';
import { LanguageSelector } from '../screens';
import BottomNavigator from '../navigations/BottomNavigator'

const Stack = createStackNavigator();

function LanguageNavigator() {
    const showLanguageSelector = true;
    const initialRouteName = showLanguageSelector ? ROUTES.LANGUAGE_SELECTOR : ROUTES.MAIN;

    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name={ROUTES.LANGUAGE_SELECTOR} component={LanguageSelector} options={{
                headerShown: false,
            }} />
            <Stack.Screen name={ROUTES.MAIN} component={BottomNavigator} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}

export default LanguageNavigator;