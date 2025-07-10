import { NavigationContainer } from "@react-navigation/native";
import { View,Text, StatusBar } from "react-native";
import Routes from "./src/routes";
import AuthProvaider from "./src/contexts/auth";

export default function App(){
    return(
       <NavigationContainer>
            <AuthProvaider>
                <StatusBar backgroundColor={'#353840'} barStyle={'light-content'}/>
                <Routes/>
            </AuthProvaider>
       </NavigationContainer>
    )
}