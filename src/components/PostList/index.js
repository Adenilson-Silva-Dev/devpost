import { Image, View, Text, StyleSheet } from "react-native";
import Header from "../Header";
import { TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/Feather";



function PostList(){
    return(
       <View style={Styles.Container} activeOpacity={.6} >
         <TouchableOpacity style={Styles.Header} >
            <Image style={Styles.Avatar} source={require('../../imgs/avatar.png')}/>
            <Text style={Styles.Name} numberOfLines={1}>Adenilson Rosa</Text>

        </TouchableOpacity>
        
            <View style={Styles.ContentView}>
                <Text style={Styles.Content}>Todo conteudo do post aqui!</Text>
            </View>

            <View style={Styles.Actions}>
                <TouchableOpacity style={Styles.LikeButton}>
                    <Text style={{color:'#e52246'}}>12</Text>
                    <Icon style={{marginLeft:6}} name="heart" size={20} color={'#e52246'}/>
                </TouchableOpacity>
                <Text style={Styles.TimePost}>há poucos minutos</Text>
            </View>
       </View>
    )
}

const Styles = StyleSheet.create({
    Container:{

        marginTop:8,
        marginLeft:8,
        marginRight:'2%',
        borderRadius:8,
       elevation:3,
       padding:11,
        backgroundColor:'#fff'
    },

    Header:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5
    },
    Avatar:{
        width:40,
        height:40,
        marginRight:8
    },

    Name:{
        fontWeight:'bold',
        fontSize:18,
        color:'#353840',
    },
    Content:{
        color:'#353840',
    },

    Actions:{
        flexDirection:'row',
        alignItems:'baseline',
        justifyContent:'space-between',
        marginTop:8
    },
    
        LikeButton:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
        },
    TimePost:{
         color:'#353840',
    }
})
export default PostList;