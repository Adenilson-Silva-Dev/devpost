import { StyleSheet, Text, View,St, SafeAreaView } from "react-native";


function Header(){
    return(
        <SafeAreaView>
            <View style={Styles.Container}>
            <Text style={Styles.Title}>Dev<Text style={{color:'#e32246', fontStyle:'italic'}}>Post</Text></Text>
        </View>
        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    Container:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        backgroundColor:'trasparent',
        borderBottomColor:'#dcdcdc',
    },
    Title:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff'
    }
    
})
export default Header;