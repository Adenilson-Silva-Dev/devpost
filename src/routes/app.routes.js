import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Icon  from "react-native-vector-icons/Feather";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPost from "../pages/NewPost";
import PostUsers from "../pages/PostUsers";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home" 
            component={Home}
            options={{
                headerShown:false
            }}
            />

            <Stack.Screen 
            name="NewPost" 
            component={NewPost}
            options={{
                title:"Novo post",
                headerTintColor:"#fff",
                headerStyle:{
                    backgroundColor:'#36393f'
                }
            }}
            />
            <Stack.Screen 
            name="PostUsers" 
            component={PostUsers}
            options={{
                headerTintColor:'#fff',
                headerStyle:{
                    backgroundColor:'#36393f'
                }
            }}
            />
        </Stack.Navigator>
    )
}
function AppRoutes(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarHideOnKeyboard:true, // quando aparecer um teclado a tabBar se esconde
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#fff',

            tabBarStyle:{
                backgroundColor:'#202225',
                borderTopWidth:0
            }

        }} >
            <Tab.Screen
            name="StackHome"
            component={StackRoutes}
            options={{
                tabBarIcon:({size, color})=>{
                    return <Icon name="home" size={size} color={color}/>
                }
            }}
            />
            <Tab.Screen
             name="Search"
             component={Search}
             options={{
                tabBarIcon:({size, color})=>{
                    return <Icon name="search" size={size} color={color}/>
                }
             }}
             />
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarIcon:({size, color})=>{
                    return <Icon name="user" size={size} color={color}/>
                }
            }}
            />
        </Tab.Navigator>
    )
}

export default AppRoutes;