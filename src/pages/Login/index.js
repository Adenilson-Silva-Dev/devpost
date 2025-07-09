import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

function Login() {
  const [login, setLogin] = useState(false);

  function toggleLogin() {
    setLogin(!login);
  }

  if (login) {
    return (
      <TouchableNativeFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={Style.Container}>
          <Text style={Style.Title}>
            Dev<Text style={[{ color: '#e52246' }]}>Post</Text>
          </Text>
          <TextInput style={Style.Input} placeholder="Seu email..." />
          <TextInput style={Style.Input} placeholder="Sua senha..." />
          <TouchableOpacity style={Style.Button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={Style.Link} onPress={toggleLogin}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableNativeFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={Style.Container}>
      <Text style={Style.Title}>
        Dev<Text style={[{ color: '#e52246' }]}>Post</Text>
      </Text>
      <TextInput style={Style.Input} placeholder="Seu nome..." />
      <TextInput style={Style.Input} placeholder="Sua email..." />
      <TextInput style={Style.Input} placeholder="Sua senha..." />
      <TouchableOpacity style={Style.Button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.Link} onPress={toggleLogin}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Fazer login</Text>
      </TouchableOpacity>
    </View>
    </TouchableNativeFeedback>
    
  );
}

export default Login;

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353840',
  },

  Title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },

  Input: {
    width: '80%',
    height: 50,
    borderRadius: 4,
    fontSize: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  Button: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#428CFD',
  },

  Link: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
