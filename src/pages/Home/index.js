import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import PostList from '../../components/PostList';
import { AuthContext } from '../../contexts/auth';

function Home() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchPosts() {
        if (isActive) {
          setPost([]);
          const postList = [];
          console.log(post);

          await firestore()
            .collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .get()
            .then((snaphot) => {
              snaphot.docs.map((u) => {
                postList.push({
                  ...u.data(),
                  id: u.id,
                });
              });

              setEmptyList(!!snaphot.empty);
              setPost(postList);
              setLastItem(snaphot.docs[snaphot.docs.length - 1]);
              setLoading(false);
            });
        }
      }
      fetchPosts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  //Buscar mais posts quando puxar sua lista para cima
  async function handleRefreshPosts() {
    setLoadingRefresh(true);
    setPost([]);
    const postList = [];
    console.log(post);

    await firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then((snaphot) => {
        snaphot.docs.map((u) => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });

        setEmptyList(false);
        setPost(postList);
        setLastItem(snaphot.docs[snaphot.docs.length - 1]);
        setLoading(false);
      });
    setLoadingRefresh(false);
  }

  // Buscar mais posts ao chear no final da lista

  async function getListPost() {
    if(emptyList){
      setLoading(false);
      return null
    }

    if(loading)return;

    firestore().collection('posts').orderBy('created','desc').limit(5).startAfter(lastItem).get()
    .then((snaphot)=>{
      const postList = [];
      snaphot.docs.map(u=>{
        postList.push({
          ...u.data(),
          id:u.id,
        })
      })
      setEmptyList(!!snaphot.empty)
      setLastItem(snaphot.docs[snaphot.docs.length -1])
      setPost(oldPost => [...oldPost, ...postList])
      setLoading(false)
    })
  }
  return (
    <View style={Styles.Container}>
      <Header />

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={'#e52246'} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={post}
          renderItem={({ item }) => <PostList data={item} userId={user?.uid} />}
          style={Styles.ListPost}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
          onEndReached={()=> getListPost()} // quando chegar no final do posts irá disparar está função
          onEndReachedThreshold={0.1} // quando chegar a 10% da lista irá disparar essa função
        />
      )}

      <TouchableOpacity
        style={Styles.ButtonPost}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}
      >
        <Icon name={'edit-2'} size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#353840',
  },

  ButtonPost: {
    width: 60,
    height: 60,
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    elevation: 2,
    zIndex: 99,
    backgroundColor: '#202225',
  },

  ListPost: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});
export default Home;
