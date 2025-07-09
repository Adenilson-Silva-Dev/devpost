import { NavigationContainer } from "@react-navigation/native";
import { View,Text, StatusBar } from "react-native";
import Routes from "./src/routes";

export default function App(){
    return(
       <NavigationContainer>
        <StatusBar backgroundColor={'#353840'} barStyle={'light-content'}/>
            <Routes/>
       </NavigationContainer>
    )
}