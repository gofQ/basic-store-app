import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../pages/Home'
import Store from '../pages/Store'
import Profile from '../pages/Profile'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/constants'
import { Image, Pressable, View } from 'react-native'
import { Text } from '@react-navigation/elements'
import Favorites from '../pages/Favorites'
import ProductPage from '../pages/ProductPage'
import Cart from '../pages/Cart'

const BottomTabs=createBottomTabNavigator()

const BottomBar = () => {
  return (
    <BottomTabs.Navigator
    screenOptions={{
        tabBarLabel:()=>false,
        tabBarActiveTintColor:colors.pink,
        tabBarActiveBackgroundColor:colors.pink1,
        tabBarInactiveTintColor:colors.pink2,
        tabBarStyle:{
            position:'absolute',
            marginHorizontal:'5%',
            bottom:20,
            elevation:0,
            boxShadow:'0 1 15 1 #00000020',
            borderRadius:9,
            overflow:'hidden',
            borderWidth:1,
            borderColor:'#00000010',
        },
        headerStyle:{
            elevation:0,
        },
        headerTitleAlign:'center', 
        sceneStyle:{
            backgroundColor:'#fff'
        }, 
        tabBarButton(props) {
            return <Pressable {...props} style={{flex:1,justifyContent:'center',alignItems:'center'}} android_ripple={{
                color:colors.pink1,
            }}  />

        },
    }}>
        <BottomTabs.Screen name="Home" component={Home}  options={{
            tabBarIcon:({focused,color,size})=>(
                    <FontAwesome5Icon name="home" color={color} size={size} />
            ),
            headerTitle:()=><Image source={require('../img/f.png')} style={{width:40,height:40,borderRadius:12}} />,
            headerLeft:()=>(
                <View style={{flexDirection:'row',alignItems:'center',gap:4,marginLeft:16}}>
                    <Text style={{fontSize:24,color:colors.pink,fontFamily:'Pacifico-Regular'}}>Ferda Store</Text>
                </View>
            ),
            headerRight:()=>(
                <View >
                    <Icon name="notifications" size={24} color={colors.pink} style={{marginRight:16}} />
                </View>
            ) 
        }} />
        <BottomTabs.Screen name='Cart' component={Cart} options={{
            tabBarIcon:({focused,color,size})=>(
                <FontAwesomeIcon name="shopping-cart" color={color} size={size} />
            )
        }} />
        <BottomTabs.Screen name="Favorites" component={Favorites} options={{
            tabBarIcon:({focused,color,size})=>(
                    <FontAwesomeIcon name="heart" color={color} size={size} />
            ),
        }} />
        <BottomTabs.Screen name="Store" component={Store} options={{
            tabBarIcon:({focused,color,size})=>(
                    <FontAwesome5Icon name="store" color={color} size={size}  />
            ),
        }} />
        <BottomTabs.Screen name="Profile" component={Profile} options={{
            tabBarIcon:({focused,color,size})=>(
                    <FontAwesome5Icon name="user" color={color} size={size} />
            ),
            headerShown:false
        }} />
    </BottomTabs.Navigator>
  )
}

export default BottomBar