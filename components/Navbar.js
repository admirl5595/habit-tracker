import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {primaryColor} from '../config/theme/styles'

// clock: daily habits
// calendar: all habits 
export default function Navbar({navigation}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('AddHabit')} style={styles.btn}>
            <FontAwesomeIcon  size={40} icon='plus-circle' color='#eeeeee'/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DailyHabits')} style={styles.btn}>
            <FontAwesomeIcon  size={40} icon='clock' color='#eeeeee'/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AllHabits')} style={styles.btn}>
            <FontAwesomeIcon size={40} icon='calendar' color='#eeeeee'/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '12%',
        backgroundColor: primaryColor,
        alignSelf: 'flex-start'
    },
    btn: {
        padding: 10
    }
})