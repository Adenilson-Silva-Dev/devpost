import React from "react"
import { StyleSheet, Text, View } from "react-native"


function Profile(){
    return(
        <View style={Style.Container}>
            <Text>Tela Profile</Text>
        </View>
    )
}




const Style = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#353840"
    }
})

export default Profile;