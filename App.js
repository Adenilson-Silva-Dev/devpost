import { NavigationContainer } from "@react-navigation/native";
import { View,Text, StatusBar } from "react-native";
import Routes from "./src/routes";
import AuthProvider from "./src/contexts/auth";

export default function App(){
    return(
            <AuthProvider>
       <NavigationContainer>
                <StatusBar backgroundColor={'#353840'} barStyle={'light-content'}/>
                <Routes/>
       </NavigationContainer>
            </AuthProvider>
    )
}