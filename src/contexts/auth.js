import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvaider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

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
        setAuthLoading(false);
      })
      .catch(error => {
        console.log(error);
        setAuthLoading(false);
      });
  }


  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, singnUp, signIn, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvaider;
