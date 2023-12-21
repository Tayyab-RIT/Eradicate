import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';

const PyleraMedicamentAcknoledgement = ({ navigation }) => {
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

  // Store the fact that the user has accepted the terms
  const storeAcceptedTerms = async () => {
    try {
      await AsyncStorage.setItem('pyleraAcceptedTerms', 'true');
      console.log('Pylera Terms accepted');
    } catch (e) {
      console.log('Error Saving terms:', e);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.text}>{SCREEN_CONTENT[language].pylera.content.medicamentAcknoledgement.content.textBlock}
          <TouchableOpacity onPress={() => Linking.openURL('mailto:safety@nbpharma.com')}>
            <Text style={styles.email}>safety@nbpharma.com</Text>
          </TouchableOpacity>
        </Text>

        <Text style={styles.confirmationText}><CheckBox value={isChecked} onValueChange={handleCheckboxChange} />{' ' + SCREEN_CONTENT[language].pylera.content.medicamentAcknoledgement.content.confirmation}</Text>

        <TouchableOpacity style={styles.button} onPress={() => {
          if (isChecked) {
            storeAcceptedTerms();
            navigation.navigate(ROUTES.PYLERA);
          } else {
            alert(SCREEN_CONTENT[language].pylera.content.medicamentAcknoledgement.content.alert)
          }
        }}><Text style={styles.buttonText}>{SCREEN_CONTENT[language].pylera.content.medicamentAcknoledgement.content.button1}</Text></TouchableOpacity>
        <Text>{'\n\n\n\n\n'}</Text>
      </View>

    </ScrollView>
  )
}

export default PyleraMedicamentAcknoledgement;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    width: 310,
    backgroundColor: COLORS.ACCENT,
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "blue",
    textDecorationLine: 'underline',
    textTransform: 'lowercase',
  },
  confirmationText: {
    fontSize: 18,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
    marginTop: 20,
  },
});