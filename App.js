import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import db from './firebase-config'
import {collection, getDocs} from "firebase/firestore"

export default function App() {

  // bytt "dailyspending" til "habits"
  const usersCollectionRef = collection(db, "dailyspending")
  
  const [userData, setUserData] = useState([])

  // hent data fra firebase
  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserData(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your habits</Text>
      <StatusBar style="auto" />
      {userData.map((doc) => <View style={styles.docContainer}><Text>{doc.weekday}</Text></View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  docContainer: {
    width: '100%',
    backgroundColor: 'rgba(150,255,150,0.8)'
  },
  header: {
    fontSize: 50,
    marginTop: '50%',
    color: 'rgba(150,150,255,0.8)'
  }
});
