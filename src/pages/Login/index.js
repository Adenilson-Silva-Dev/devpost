import { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../contexts/auth';

function Login() {
  const [login, setLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { singnUp, signIn, authLoading } = useContext(AuthContext);
  function toggleLogin() {
    setLogin(!login);

    setNome('');
    setEmail('');
    setPassword('');
  }

  async function handleLogin() {
    if (email === '' || password === '') {
      alert('Preecha todos os campos');
      return;
    }
    await signIn(email, password);
  }

  async function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      alert('Preecha todos os campos');
      return;
    }
    await singnUp(email, password, nome);
  }
  if (login) {
    return (
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <View style={Style.Container}>
          <Text style={Style.Title}>
            Dev<Text style={[{ color: '#e52246', fontStyle: 'italic' }]}>Post</Text>
          </Text>
          <TextInput
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={Style.Input}
            placeholder="Seu email..."
          />
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            style={Style.Input}
            placeholder="Sua senha..."
          />
          <TouchableOpacity style={Style.Button} onPress={handleLogin}>
            {authLoading ? (
              <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={Style.Link} onPress={toggleLogin}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={Style.Container}>
        <Text style={Style.Title}>
          Dev<Text style={[{ color: '#e52246', fontStyle: 'italic' }]}>Post</Text>
        </Text>
        <TextInput
          value={nome}
          onChangeText={(value) => setNome(value)}
          style={Style.Input}
          placeholder="Adenilson"
        />
        <TextInput
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={Style.Input}
          placeholder="adenilsontosa@gmail.com"
        />
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={Style.Input}
          placeholder="*********"
        />
        <TouchableOpacity style={Style.Button} onPress={handleSignUp}>
          {authLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Text style={{ fontSize: 20, color: '#fff' }}>Criar conta</Text>
          )}
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
