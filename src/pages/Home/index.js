import React from "react"
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../components/Header";



function Home(){

    const navigation = useNavigation()
    return(
        
        <View style={Styles.Container}>
            <Header/>
            <TouchableOpacity style={Styles.ButtonPost} activeOpacity={.8} onPress={()=>navigation.navigate('NewPost')}>
                <Icon name={'edit-2'} size={20} color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#353840"
    },

    ButtonPost:{
        width:60,
        height:60,
        borderRadius:'100%',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:20,
        right:10,
        elevation:2,
        zIndex:99,
        backgroundColor:'#202225'
    }
})
export default Home;