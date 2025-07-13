import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/Feather';

function Profile() {
  const { user,signOut } = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }

  function atualizarPerfil(){
    console.log('Deseja atualizar')
  }
  return (
    <View style={Style.Container}>
      <TouchableOpacity style={Style.AreaAvatar} activeOpacity={.8} onPress={atualizarPerfil}>
        <Image style={Style.Avatar} source={require('../../imgs/avatar.png')} />

        <View style={Style.ContainerIcon}>
          <View style={Style.AreaIcon}>
            <Icon name="edit-2" size={20} color={'#383940'} />
          </View>
        </View>
      </TouchableOpacity>

      <View style={Style.AreaInfo}>
        <Text numberOfLines={1} style={Style.NameUser}>
          {user.nome}
        </Text>
        <Text style={Style.Email}>{user.email}</Text>
      </View>

      <TouchableOpacity style={Style.Button} onPress={atualizarPerfil} >
        <Text style={{ color: '#fff', fontSize: 20 }}>Atualizar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[Style.Button, {backgroundColor:'trasparent', borderWidth:1, borderColor:'#fff'}]} onPress={handleSignOut}>
        <Text style={{ color: '#e52246', fontSize: 20 }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#353840',
  },

  Button: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:8,
    backgroundColor: '#428CFD',
  },

  AreaAvatar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  Avatar: {
    width: 150,
    height: 150,
  },

  AreaInfo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:8
  },
  NameUser: {
    width:'50%',
    textAlign:  'center',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '900',
    color: '#fff',
  },
Email:{

    fontSize:18,
    fontStyle: 'italic',
    marginBottom:18,
    color:'#fff'
},
  ContainerIcon: {
    width: '25%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',

    position: 'absolute',
    bottom: 0,
   
  },

  AreaIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'100%',
    backgroundColor:'#fff',
    
  },
  Icon: {
    borderRadius: '100%',
  },
});

export default Profile;
