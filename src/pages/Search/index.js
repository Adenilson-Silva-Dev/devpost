import React from "react"
import { Text, View, StyleSheet} from "react-native"


function Search(){
    return(
        <View style={Styles.Container}>
            <Text>Tela Search</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#353840"
    }
})
export default Search;