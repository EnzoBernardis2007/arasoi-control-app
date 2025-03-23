import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Control from '../screens/Control'
import Search from '../screens/Search'

const Stack = createStackNavigator()

const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Control" component={Control} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator