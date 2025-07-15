import React, { useCallback, useContext, useState } from "react"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import PostList from "../../components/postList";



function Home(){

    const {user} = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

 

    
    useFocusEffect(
       useCallback(()=>{
       
          let isActive = true;

       async function fetchPosts(){
          
            if(isActive){
                setPost([]);
                const postList = [];
                console.log(post)

               await firestore().collection('posts').orderBy('created', 'desc')
                .limit(5).get()
                .then((snaphot)=>{
                    snaphot.docs.map( u => {
                        postList.push({
                            ...u.data(),
                            id:u.id
                        })
                    })

                    setPost(postList);
                    setLoading(false)
                })
            }
        }
        fetchPosts();

        return ()=>{
            isActive = false;
        }
       },[])
    )
    return(
        
        <View style={Styles.Container}>
            <Header/>

            {loading ? (
                <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator size={'large'} color={'#e52246'}/>
                </View>
            ):(
                <FlatList
            data={post}
            id
            renderItem={({item})=> (
            <PostList data={item} userId={user?.uid}/>
        )}
            style={Styles.ListPost}/>
            )}
            
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
    },

    ListPost:{
        flex:1,
        backgroundColor:'#f1f1f1'
    }
})
export default Home;