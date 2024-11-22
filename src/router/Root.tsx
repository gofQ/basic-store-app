import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomBar from './BottomBar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductPage from '../pages/ProductPage'

const Stack=createNativeStackNavigator()

const Root = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen name='Login' component={Login} options={{
            headerShown:false,
          }} />
          <Stack.Screen name='Register' component={Register} options={{
            headerShown:false,
          }} />
          <Stack.Screen name="Root" component={BottomBar} options={{
                headerShown:false,
            }} />
          <Stack.Screen name="ProductPage" component={ProductPage} options={{
            headerShown:false,
          }} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root