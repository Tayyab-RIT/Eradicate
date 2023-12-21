import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';

const TreatmentAcknoledgement = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage !== null) {
          console.log('Language retrieved successfully:', storedLanguage);
          setLanguage(storedLanguage);
        }
      } catch (error) {
        console.log('Error retrieving language:', error);
      }
    };
    retrieveLanguage();

  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{SCREEN_CONTENT[language].treatment.content.acknoledgement.content.textBlock}</Text>
      <Text style={styles.confirmationText}><CheckBox value={isChecked} onValueChange={handleCheckboxChange} />{' ' + SCREEN_CONTENT[language].treatment.content.acknoledgement.content.confirmation}</Text>
      <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
        if (isChecked) {
          navigation.navigate(ROUTES.TREATMENT_MEDICAMENT)
        } else {
          alert(SCREEN_CONTENT[language].treatment.content.acknoledgement.content.alert)
        }
      }}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.acknoledgement.content.button1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.red]} onPress={() => navigation.navigate(ROUTES.HOME)}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.acknoledgement.content.button2}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TreatmentAcknoledgement;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    width: 340,
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    elevation: 12,
  },
  green: {
    backgroundColor: COLORS.GREEN,
  },
  red: {
    backgroundColor: COLORS.RED,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  confirmationText: {
    fontSize: 18,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
    marginTop: 20,
  },
});