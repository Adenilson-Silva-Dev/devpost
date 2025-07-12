import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(()=>{
    async function loadStorage(){
        const storangeUser = await AsyncStorage.getItem('@devpost');

        if(storangeUser){
            setUser(JSON.parse(storangeUser))
            setAuthLoading(false)
        }
    }

    loadStorage();
  },[])
  async function singnUp(email, password, name) {
    setAuthLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            nome: name,
            createdAt: new Date(),
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email,
            };
            setUser(data);
            storangeUser(data);
            setAuthLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function signIn(email, password) {
    setAuthLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        const userProfile = await firestore()
          .collection('users')
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          email: value.user.email,
        };

        setUser(data);
        storangeUser(data);
        setAuthLoading(false);
      })
      .catch(error => {
        console.log(error);
        setAuthLoading(false);
      });
  }

  async function signOut(){
   await auth().signOut();

   await AsyncStorage.clear()
   .then(()=>{
    setUser(null)
   })
  

  }
console.log(user)
  async function storangeUser(data){
    await AsyncStorage.setItem('@devpost', JSON.stringify(data))
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, singnUp, signIn,signOut, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
