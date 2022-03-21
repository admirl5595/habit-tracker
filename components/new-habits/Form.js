import React, {useState} from 'react'

import { Text, View, TextInput, TouchableOpacity,  SafeAreaView, StyleSheet, ScrollView  } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { primaryColor } from '../../config/theme/styles';

import DaysSelector from '../new-habits/DaysSelector';

import styles from './FormStyles'

// onSubmit: either create or edit habit
// habitInfor: previous habit info (null when creating a new one)
const Form = ({onSubmit, habitInfo}) => {
  
  // habit name
  const [name, setName] = useState(habitInfo ? habitInfo.name : "") 

  const icons = [
    "person-running",
    "person-swimming",
    "fish-fins",
    'futbol',
    'skiing',
    "person-running",
    "person-swimming",
    "fish-fins",
    'futbol',
    'skiing'
  ]

  const [icon, setIcon] = useState(habitInfo ? habitInfo.icon : '')

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ]

  // initial days selection
  const defaultDays = habitInfo ? habitInfo.dayOfWeek : [false, false, false, false, false, false, false]

  // turn bool list into list of day strings
  let defaultDaysStrings = defaultDays.map((bool, index) => bool ? days[index] : null)

  // remove null values after mapping
  defaultDaysStrings = defaultDaysStrings.filter((value) => value !== null)

  const [selectedDays, setSelectedDays] = useState(defaultDaysStrings)

  // colors the user can assign to a habit
  const colors = [
    'rgba(127, 208, 245, 1)',
    'rgba(111, 237, 109, 1)',
    'rgba(173, 109, 237, 1)',
    'rgba(245, 91, 91, 1)',
    'rgba(227, 232, 86, 1)' 
  ]

  const [color, setColor] = useState(habitInfo ? habitInfo.color : null)

  // toggle the inclusion of a day in the selected days
  const toggleDay = (day) => {

    let selectedDaysCopy = [...selectedDays]

    console.log(selectedDaysCopy)

    console.log(day)

    if (selectedDaysCopy.includes(day)){
      selectedDaysCopy = selectedDaysCopy.filter(prevDay => prevDay !== day)
      
      console.log(day)
    } else {
      selectedDaysCopy.push(day)
    }

    setSelectedDays(selectedDaysCopy)

  }

  return(
    <ScrollView  showsVerticalScrollIndicator={false}  style={styles.container}>

      <Text style={styles.inputLabel}>Name</Text> 
      <TextInput style={styles.textInput} onChangeText={setName} placeholder='Habit name'/>

      <Text style={styles.inputLabel}>Icon</Text> 
      <ScrollView  showsHorizontalScrollIndicator={false}  horizontal={true} style={styles.iconsContainer}>
      {icons.map(iconOption =>  
        <TouchableOpacity 
        style={[styles.icon]} 
        onPress={() => setIcon(iconOption)} >
          <FontAwesomeIcon color={iconOption === icon ? primaryColor : 'gray'}  size={50} key={iconOption} icon={iconOption}/>
        </TouchableOpacity> )}
      </ScrollView>

      <Text style={styles.inputLabel}>Frequency</Text> 
      <DaysSelector selectedDays={selectedDays} setSelectedDays={(day)=>toggleDay(day)}/>

      <Text style={styles.inputLabel}>Color</Text> 
      <View style={styles.colorSelectorContainer}>
        {colors.map(colorOption => 
        <TouchableOpacity 
        style={[styles.colorSelector, {backgroundColor: colorOption}]} 
        onPress={() => setColor(colorOption)}>
          {color === colorOption ? <FontAwesomeIcon color='#fff' size={30} icon='circle-check' /> : null}
          </TouchableOpacity>
        
       )}
      </View>
      
    </ScrollView>
  );
};

export default Form;