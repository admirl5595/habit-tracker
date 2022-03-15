import react, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import auth from '@react-native-firebase/auth';
import AppNavigator from "../config/AppNavigator";
import AuthNavigator from "../config/AuthNavigator";

export default function LoadingScreen() {

  useEffect(() => { 
    auth().onAuthStateChanged(user => {
      if (user) {
        return <AppNavigator/>
      }
      else {
        return <AuthNavigator/>
      }
    })
  }, [])
}
