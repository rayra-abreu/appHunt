import 'react-native-gesture-handler'
import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Main from './pages/main'
import Product from './pages/product'

const AppStack = createStackNavigator()

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator initialRouteName="Main" screenOptions={{headerShown: true, 
                headerTitleAlign: 'center',
                headerStyle:{
                    backgroundColor: '#DA552F',
                },
                headerTintColor: '#FFF',}}>
                <AppStack.Screen name="Main" component={Main} options={{title: 'JS Hunt'}}/>
                <AppStack.Screen name="Product" component={Product} options={({ route }) => ({ title: route.params.product.title })}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}