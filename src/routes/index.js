import { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";



function Routes(){
    const {signed,loading} = useContext(AuthContext);

    if(loading){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#353840"}}>
                <ActivityIndicator size={"large"} color={"#e52246"}/>
            </View>
        )
    }
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;