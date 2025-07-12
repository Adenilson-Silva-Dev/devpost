import React from "react"
import { StyleSheet, Text, View } from "react-native"


function Home(){
    return(
        <View style={Styles.Container}>
            <Text>Tela Home</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#353840"
    }
})
export default Home;