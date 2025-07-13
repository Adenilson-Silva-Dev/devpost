import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import storange from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

function NewPost() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={Styles.ButtonCompartilhar}
          onPress={handlePost}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '900',
              paddingRight: 8,
            }}
          >
            Compartilhar
          </Text>
          <Icon name="share-2" size={20} color={'#fff'} />
        </TouchableOpacity>
      ),
    });
  }, [post, navigation]);

  async function handlePost() {
    // primeira coisa, verificar se o campo post esta vazia

    if (post === '') {
      alert('Insira um post!');
      return;
    }

    let avatarUrl = null;

    try {
      let response = await storange()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();
      avatarUrl = response;
    } catch (error) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        post: post,
        autor: user?.nome,
        likes: 0,
        userId: user.uid,
        avatarUrl,
      })

      .then(() => {
        setPost('');
       console.log("Post criado com sucesso!")
      })
      .catch(error => {
        alert('Erro ao criar post', error);
      });
    navigation.goBack();
  }

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Styles.Container}>
        <TextInput
          style={Styles.Input}
          placeholder="Digite seu post?"
          placeholderTextColor={'#ddd'}
          value={post}
          onChangeText={text => setPost(text)}
          autoCorrect={false} // para o corretor do teclado nao afetar
          multiline={true} // faz o inpute quebrar linha ao chegar no final
          maxLength={100} // define apenas 100 caracters
        />
      </View>
    </TouchableNativeFeedback>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#353839',
  },
  Input: {
    backgroundColor: 'trasparent',
    margin: 10,
    color: '#fff',
    fontSize: 20,
  },
  ButtonCompartilhar: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    backgroundColor: '#428CFD',
  },
});
export default NewPost;
